import { fetchUrl } from 'fetch';

export const registerLongPolling = () => {
  let counter = 0;
  fetchUrl('http://localhost:3000/longpolling', (error, meta, body) => {
      if (error) {
        setTimeout(() => {
          registerLongPolling();
          counter++;
        }, 1000);
        return;
      }

      if (counter > 4) {
        return;
      }

      setTimeout(() => {
        registerLongPolling();
        counter++;
      }, 1000);
  });
};
