import PropTypes from 'prop-types';
import { createState } from 'phnq-lib';
import api from '../api';

export const seedsPropType = PropTypes.arrayOf(
  PropTypes.oneOfType([PropTypes.instanceOf(Artist), PropTypes.instanceOf(Track)])
);

export const groupPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.instanceOf(Artist), PropTypes.instanceOf(Track)])),
  tags: PropTypes.arrayOf(PropTypes.instanceOf(Tag)),
  tracks: PropTypes.arrayOf(PropTypes.instanceOf(Track)),
});

export const groupsPropType = PropTypes.arrayOf(groupPropType);

export const similarArtistsByGroupPropType = PropTypes.objectOf(PropTypes.arrayOf(PropTypes.instanceOf(Artist)));

const analysisState = createState(
  'analysis',
  {
    mixes: [],
    suggestedArtists: [],
  },
  (getState, setState) => ({
    clearSuggestedArtists() {
      setState({ suggestedArtists: [] });
    },

    async fetchSuggestedArtists(limit = 20) {
      setState({ suggestedArtists: await api.getSuggestedArtists({ limit }) });
    },

    clearMixes() {
      setState({ mixes: [] });
    },

    async fetchMixes() {
      setState({ mixes: await api.getMixes() });
    },
  })
);

export default analysisState;
