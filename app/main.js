import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { registerSSE } from './sse';
import { registerWebSocket } from './websocket';

registerSSE();
registerWebSocket();

ReactDOM.render(<App />, document.getElementById('root'));
