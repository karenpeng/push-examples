export const registerWebSocket = () => {
  const wsConnection = new WebSocket('ws://localhost:3000/websocket');

  wsConnection.onopen = () => {
    console.log('websocket connection is opened')
    wsConnection.send('A');
  };

  wsConnection.onmessage = event => {
    if (event.data === '9') {
      setTimeout(() => {
        wsConnection.send('A');
      }, 3000);
    }
  }

  wsConnection.onerror = event => {
    if (event.readyState === WebSocket.CLOSED) {
      console.log('websocket connection is closed')
    }
  }

  setTimeout(() => {
    console.log('client closes the websocket connection');
    wsConnection.close();
  }, 30000);
};
