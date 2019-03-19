const handleLongPolling = app => {
  let counter = 0;

  app.get('/longpolling', (req, res, next) => {
      const delay = Math.random();
      setTimeout(() => {
        res.send({
          random: delay,
          sequence: counter
        });
        counter++;
      }, delay * 30000);
  });
};

module.exports = handleLongPolling;
