import { createState, getLocation } from 'phnq-lib';

const userState = createState(
  'user',
  {
    location: undefined,
  },
  (getState, setState) => ({
    async fetchLocation() {
      if (!getState().location) {
        setState({ location: await getLocation() });
      }
    },
  })
);

export default userState;
