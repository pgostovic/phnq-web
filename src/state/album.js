import { createState } from 'phnq-lib';
import api from '../api';

const albumState = createState(
  'album',
  {
    album: undefined,
    albumTags: undefined,
    albumDescription: undefined,
  },
  (getState, setState) => ({
    clearAlbum() {
      setState({ album: undefined, albumTags: undefined, albumDescription: undefined });
    },

    async fetchAlbum(id) {
      const album = await (await api).getAlbum({ id });
      setState({ album });

      const [albumDescription, albumTags] = await Promise.all([
        (await api).getAlbumDescription({ artistName: album.artist.name, albumName: album.name }),
        (await api).getAlbumTags({ artistName: album.artist.name, albumName: album.name }),
      ]);

      setState({ albumDescription, albumTags });
    },
  })
);

export default albumState;
