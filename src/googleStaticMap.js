import React from 'react';

//const React = require('react')
//const coords = '37.7837403,-122.40905780000001';
class GoogleMapStatic extends React.Component {
	constructor (props) {
		super (props)
		this.state = {
			coordLat: '37.7837403',
			coordLon: '-122.40905780000001'
		}
	}

	componentWillReceiveProps (nextProps) {
    if (nextProps) {	
    	console.log('Iv got new Props: '+ nextProps.coords.Latitude)
	    this.setState({
	      coordLat: nextProps.coords.Latitude.toString(),
	      coordLon: nextProps.coords.Longitude.toString(),
	    })
    }
  }

  render () {
	const mapVar = ['https://maps.googleapis.com/maps/api/staticmap?markers=color:red|',this.state.coordLat, ',' , this.state.coordLon ,'&zoom=12&size=400x400&key=AIzaSyDij3hmLUQwFjcHinguhvLwujUGMyGaHgw'].join('')
    return (
    	<div>
    		<p>{this.state.coordLat}</p>
      	<img src={mapVar}/> 
      </div>
    );
  }
}

export default GoogleMapStatic;

//'https://maps.googleapis.com/maps/api/staticmap?markers=color:red|'+${coords}+'&zoom=12&size=400x400&key=AIzaSyDij3hmLUQwFjcHinguhvLwujUGMyGaHgw'