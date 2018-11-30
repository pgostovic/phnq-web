import { createState } from 'phnq-lib';
import api from '../api';
import PlayerState from '../../model/playerState';

let previewAudio = null;

const playerState = createState(
  'player',
  {
    playerStatus: new PlayerState(),
    statusListeners: new Set(),
    currentTime: null,
    duration: null,
    currentTrack: null,
  },
  (getState, setState) => ({
    async addStatusListener(listener) {
      const { statusListeners } = getState();
      try {
        if (statusListeners.size === 0) {
          await (await api).subscribe({ type: 'playerState' });
          this.updatePlayerStatus();
          (await api).on('playerState', this.updatePlayerStatus);
        }
        statusListeners.add(listener);
        setState({ statusListeners });
      } catch (err) {
        // probably permission denied.
      }
    },

    async removeStatusListener(listener) {
      const { statusListeners } = getState();
      if (statusListeners.has(listener)) {
        statusListeners.delete(listener);
        setState({ statusListeners });
        if (statusListeners.size === 0) {
          (await api).unsubscribe({ type: 'playerState' });
          (await api).off('playerState', this.updatePlayerStatus);
        }
      }
    },

    async updatePlayerStatus(playerStatus = null) {
      if (playerStatus) {
        setState({ playerStatus });
      } else {
        setState({ playerStatus: await (await api).getPlayer() });
      }
    },

    playPreview(track, ended = () => {}) {
      if (previewAudio) {
        previewAudio.pause();
      }

      previewAudio = new window.Audio(track.previewUrl);

      previewAudio.addEventListener('ended', () => {
        setState({ currentTrack: null });
        ended();
      });

      previewAudio.addEventListener('pause', () => {
        setState({ currentTrack: null });
      });

      previewAudio.addEventListener('play', () => {
        setState({ currentTrack: track });
      });

      previewAudio.addEventListener('loadedmetadata', () => {
        setState({ duration: previewAudio.duration });
      });

      previewAudio.addEventListener('timeupdate', () => {
        setState({ currentTime: previewAudio.currentTime });
      });

      previewAudio.play();
    },

    pausePreview() {
      if (previewAudio) {
        previewAudio.pause();
      }
    },

    playPreviews(tracks) {
      if (tracks[0]) {
        this.playPreview(tracks[0], () => {
          this.playPreviews(tracks.slice(1));
        });
      }
    },

    async play(tracks, isPreview = false) {
      if (isPreview) {
        (await api).pausePlayer();
        this.playPreviews(tracks);
      } else {
        this.pausePreview();

        this.updatePlayerStatus(new PlayerState({ track: tracks[0] }));

        (await api).playTracks({ trackIds: tracks.map(track => track.id) });
      }
    },

    async pause() {
      this.pausePreview();
      (await api).pausePlayer();
    },
  })
);

export default playerState;
