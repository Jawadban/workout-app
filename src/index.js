import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import App from './components/App'
import PushUps from './components/exerciseComponents/PushupComponent.js'
import './index.css';


ReactDOM.render(
	<Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/PushUps" component={PushUps}/>
  </Router>,
  document.getElementById('root'))

