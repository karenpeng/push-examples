const handleWebSocket = app => {
  app.ws('/websocket', (ws, req) => {
    ws.on('message', (msg) => {
      if (msg === 'A') {
        ws.send('9');
      }
    });
    console.log('socket', req.testing);
  });
};

module.exports = handleWebSocket;
