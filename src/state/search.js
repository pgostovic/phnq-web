import { createState, newLogger } from 'phnq-lib';
import api from '../api';

const log = newLogger('phnq-web.searchState');

const seq = (function* seqGen() {
  let i = 0;
  while (true) {
    i += 1;
    yield i;
  }
})();

let latestSeq = -1;

const searchState = createState(
  'search',
  {
    searchText: '',
    searchResults: [],
    selectedResult: null,
  },
  (getState, setState) => ({
    async search(searchText) {
      // Need to set the searchText state immediately
      setState({ searchText });

      if (searchText) {
        const { id, results } = await (await api).search({ text: searchText, id: seq.next().value });
        if (id > latestSeq) {
          latestSeq = id;
          setState({ searchResults: results });
        } else {
          log('Search response out of order');
        }
      } else {
        setState({ searchResults: [] });
      }
    },

    selectResult(selectedResult) {
      setState({ selectedResult });
    },
  })
);

export default searchState;
