import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './scss/index.scss';
import App from './App';
import store from './store';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
<<<<<<< HEAD
  <React.Fragment>
    <App />
  </React.Fragment>,
=======
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
>>>>>>> c5649243c69371c1556c10a778b4bf7f49015437
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
