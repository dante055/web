import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StateProvider } from './context/StateProvider';
import { initialState, reducer } from './context/reducer.js';

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>,
  document.getElementById('root')
);
