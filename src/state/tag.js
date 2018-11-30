import { createState } from 'phnq-lib';
import api from '../api';

const tagState = createState(
  'tag',
  {
    tag: undefined,
    relatedTags: [],
  },
  (getState, setState) => ({
    clearTag() {
      setState({ tag: undefined, relatedTags: [] });
    },

    async fetchTag(tagName) {
      const tag = await (await api).getTag({ name: tagName });
      setState({ tag });
      setState({ relatedTags: await (await api).getRelatedTags({ name: tagName }) });
    },
  })
);

export default tagState;
