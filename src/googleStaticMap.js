import React, { Component } from 'react';

//const React = require('react')

class GoogleMapStatic extends React.Component {
  constructor (props) {
    super (props)
  }
  render () {
    return (
      <img src='https://maps.googleapis.com/maps/api/staticmap?markers=color:red|37.7837403,-122.40905780000001&zoom=12&size=400x400&key=AIzaSyDij3hmLUQwFjcHinguhvLwujUGMyGaHgw' /> 
    );
  }
}

export default GoogleMapStatic;
