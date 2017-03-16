import React from 'react';

//const React = require('react')
//const coords = '37.7837403,-122.40905780000001';
class GoogleMapStatic extends React.Component {
	constructor (props) {
		super (props)
		this.state = {
			coordLat: '',
			coordLon: '',
		}
	}



	// componentWillReceiveProps (nextProps) {
 //    if (nextProps) {	
 //    	//console.log('Iv got new Props: '+ nextProps.coords.Latitude)
	//     this.setState({
	//       coordLat: nextProps.coords.Latitude.toString(),
	//       coordLon: nextProps.coords.Longitude.toString(),
	//     })
 //    }
 //  }

  render () {
	  let latitude = this.props.coords? this.props.coords.Latitude: '';
	  let longitude = this.props.coords? this.props.coords.Longitude: '';
		const mapVar = ['https://maps.googleapis.com/maps/api/staticmap?markers=color:red|'
		, this.props.coords? this.props.coords.Latitude: '' , ',' , this.props.coords? this.props.coords.Longitude: '' ,'&zoom=18&size=400x400&key=AIzaSyDij3hmLUQwFjcHinguhvLwujUGMyGaHgw'].join('')
    
    return (
    	<div style={{float: 'left'}}>
  			<ul>	
    			<h1 style={{color: 'black', background:'aqua'}}>Your current location:</h1>
      		<img src={mapVar} style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 blue'}}/> 
  			</ul>
      </div>
    );
  }
}

export default GoogleMapStatic;

//'https://maps.googleapis.com/maps/api/staticmap?markers=color:red|'+${coords}+'&zoom=12&size=400x400&key=AIzaSyDij3hmLUQwFjcHinguhvLwujUGMyGaHgw'