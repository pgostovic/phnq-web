import { createState } from 'phnq-lib';
import api from '../api';

const authState = createState(
  'auth',
  {
    authError: null,
    authAttempted: false,
    authenticated: false,
    needsPassword: false,
    spotifyConnected: false,
    spotifyCallbackState: null,
  },
  (getState, setState) => ({
    clearAuthError() {
      setState({ authError: null });
    },

    async createAccount(email) {
      try {
        this.clearAuthError();
        await (await api).createAccount({ email });
      } catch (err) {
        setState({ authError: err });
      }
    },

    async login({ email, password, code }) {
      try {
        this.clearAuthError();
        const { sessionId } = await (await api).login({ email, password, code });
        window.localStorage.sid = sessionId;
        await this.authenticate();
      } catch (err) {
        setState({ authenticated: false, authError: err });
        window.localStorage.removeItem('sid');
      }
    },

    async logout() {
      window.localStorage.removeItem('sid');
      setState({ authenticated: false });
      (await api).logout();
    },

    async authenticate() {
      let authenticated = false;
      let spotifyConnected = false;
      let needsPassword = false;
      const sessionId = window.localStorage.sid;
      if (sessionId) {
        ({ authenticated, spotifyConnected, needsPassword } = await (await api).authenticate({ sessionId }));
        if (!authenticated && !needsPassword) {
          window.localStorage.removeItem('sid');
        }
      }
      setState({ authenticated, spotifyConnected, needsPassword, authAttempted: true });
    },

    async setPassword(password) {
      try {
        await (await api).setPassword({ password });
        setState({ needsPassword: false });
      } catch (err) {
        setState({ authError: err });
      }
    },

    async connectSpotify() {
      await (await api).connectSpotify();
    },

    setSpotifyConnected(spotifyConnected = true) {
      setState({ spotifyConnected });
    },

    async setSpotifyCode(code, cbState) {
      if (await (await api).setSpotifyCode(code)) {
        setState({ spotifyCallbackState: cbState });
      } else {
        console.log('Not sure if this is likely to happen...');
      }
    },

    unsetSpotifyCallbackState() {
      setState({ spotifyCallbackState: null });
    },
  })
);

export default authState;
