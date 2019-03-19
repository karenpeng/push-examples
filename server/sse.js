/* On the server side, when get the request from eventSource,
 * response with content type as 'text/event-stream',
 * and write data in the format according to
 * https://www.w3.org/TR/2009/WD-eventsource-20090421/
 */
const constructSSEMsg = (res, id, data) => {
  res.write('id: ' + id + '\n');
  res.write('data: ' + data + '\n\n');
};

const handleSSE = app => {
  app.get('/sse', (req, res) => {
    res.writeHead(200, {
      'Connection': 'keep-alive',
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache'
    });
    const id = new Date();
    let counter = 0;
    setInterval(() => {
      constructSSEMsg(res, id, JSON.stringify({
        random: Math.random(),
        sequence: counter
      }));
      counter++;
    }, 3000);
  });
};

module.exports = handleSSE;
