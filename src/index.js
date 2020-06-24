import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from './store/reducers'
import setAuthorization from './utils/setAuthorization'
import {set_user} from './store/actions/userRegistry'
import jwtDecode from 'jwt-decode'


const store = createStore(reducers, {}, applyMiddleware(logger, thunk))

if (localStorage.token) {
  setAuthorization(localStorage.token)
  store.dispatch(set_user(jwtDecode(localStorage.token)))
}


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
document.getElementById('root'));

