import { createState } from 'phnq-lib';
import api from '../api';

const artistState = createState(
  'artist',
  {
    artist: undefined,
    artistImages: [],
    similarArtists: [],
  },
  (getState, setState) => ({
    clearArtist() {
      setState({
        artist: undefined,
        artistImages: [],
        similarArtists: [],
      });
    },

    async fetchArtist(mbid) {
      const [name] = (/name:(.+)/.exec(mbid) || []).slice(-1);
      const params = name ? { name } : { mbid };
      setState({ artist: await (await api).getArtist(params) });
    },

    async fetchImages(artistName) {
      setState({ artistImages: await (await api).getArtistImages({ name: artistName }) });
    },

    async fetchSimilarArtists(artistName, limit = 40) {
      setState({ similarArtists: await (await api).getSimilarArtists({ name: artistName, limit }) });
    },
  })
);

export default artistState;
