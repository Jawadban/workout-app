import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Router, Route, hashHistory } from 'react-router'
import PushUps from './PushUps.js'

ReactDOM.render(
	<Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/PushUps" component={PushUps}/>
  </Router>,
  document.getElementById('root')
);
