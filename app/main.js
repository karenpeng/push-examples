import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { registerLongPolling } from './longpolling';
import { registerSSE } from './sse';
import { registerWebSocket } from './websocket';

registerLongPolling();
registerSSE();
registerWebSocket();

ReactDOM.render(<App />, document.getElementById('root'));
