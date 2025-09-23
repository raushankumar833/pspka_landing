export const checkNetwork = () => {
  let networkStatus = window.navigator.onLine;
  window.addEventListener('online', (on) => {
    if (on && on.type === 'online') {
      networkStatus = true;
      return true;
    }
  });
  window.addEventListener('offline', (off) => {
    if (off && off.type === 'offline') {
      networkStatus = false;
      return false;
    }
  });
  return networkStatus;
};
