import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import routes from './routes';
import { loadCourses }  from './actions/courseAction';
import { loadAuthors } from './actions/authorAction';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css';
import '../node_modules/toastr/build/toastr.min.css';
import './styles/styles.css';



const store = configureStore();
store.dispatch(loadCourses());
store.dispatch(loadAuthors());

render(
  <Provider store={store}>
      <Router history={browserHistory} routes={routes}/>
  </Provider>,
  document.getElementById('app')
);
