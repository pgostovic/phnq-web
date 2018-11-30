import { createState, wait } from 'phnq-lib';

const toastId = (function* messageIdGen() {
  let i = 0;
  while (true) {
    i += 1;
    yield i;
  }
})();

const notifyState = createState(
  'notify',
  {
    toasts: [],
  },
  (getState, setState) => ({
    async toast(message, millis = 5000, fadeMillis = 300) {
      const toast = {
        id: toastId.next().value,
        message,
        active: true,
      };
      setState({ toasts: [toast, ...getState().toasts] });
      await wait(millis);
      setState({ toasts: getState().toasts.map(t => (t.id === toast.id ? { ...t, active: false } : t)) });
      await wait(fadeMillis);
      setState({ toasts: getState().toasts.filter(t => t.id !== toast.id) });
    },
  })
);

export default notifyState;
