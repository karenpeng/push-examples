/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

/* On the server side, when get the request from eventSource,
 * response with content type as 'text/event-stream',
 * and write data in the format according to
 * https://www.w3.org/TR/2009/WD-eventsource-20090421/
 */
const constructSSEMsg = (res, id, data) => {
  res.write('id: ' + id + '\n');
  res.write('data: ' + data + '\n\n');
};

const handleSSErequest = () => {
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

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  handleSSErequest();
  app.get('*', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/dist'));
  handleSSErequest();
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
