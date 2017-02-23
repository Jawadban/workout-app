import React from 'react';

//const React = require('react')
//const coords = '37.7837403,-122.40905780000001';
class GoogleMapStatic extends React.Component {
	constructor (props) {
		super (props)
		this.state = {
			coordLat: '36.7837403',
			coordLon: '-121.40905780000001'
		}
	}

	componentWillReceiveProps (nextProps) {
    if (nextProps) {	
    	console.log('Iv got new Props')
	    this.setState({
	      coordLat: nextProps.coords.Latitude.toString(),
	      coordLat: nextProps.coords.Longitude.toString()
	    })
    }
  }

  render () {
	const mapVar = ['https://maps.googleapis.com/maps/api/staticmap?markers=color:red|',this.state.coordLat, ',' , this.state.coordLon ,'&zoom=12&size=400x400&key=AIzaSyDij3hmLUQwFjcHinguhvLwujUGMyGaHgw'].join('')
    return (
      <img src={mapVar}/> 
    );
  }
}

export default GoogleMapStatic;

//'https://maps.googleapis.com/maps/api/staticmap?markers=color:red|'+${coords}+'&zoom=12&size=400x400&key=AIzaSyDij3hmLUQwFjcHinguhvLwujUGMyGaHgw'