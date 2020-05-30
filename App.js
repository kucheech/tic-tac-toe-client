import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import TicTacToeApp from './TicTacToeApp';

const App = () => (
  <Provider store={store}>
    <TicTacToeApp />
  </Provider>
);

module.exports = App;
