import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux'
import configureStore from './redux/store'

import jwtDecode from 'jwt-decode'
import {SET_AUTHENTICATED} from './redux/types'
import { logoutUser, getUserData } from './redux/actions/userAction'
import axios from 'axios'

const initialState = {};

const store = configureStore(initialState);

const token = localStorage.getItem('FBIdToken')

if(token) {
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = '/login';
  } else {
        store.dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common['authorization'] = token;
        store.dispatch(getUserData())
  }
  
}


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
