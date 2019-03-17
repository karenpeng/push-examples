import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { registerSSE } from './sse';

registerSSE();
ReactDOM.render(<App />, document.getElementById('root'));
