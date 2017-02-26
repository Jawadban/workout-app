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
  console.log('im woring fine');
	const mapVar = ['https://maps.googleapis.com/maps/api/staticmap?markers=color:red|'
	, this.props.coords? this.props.coords.Latitude: '' , ',' , this.props.coords? this.props.coords.Longitude: '' ,'&zoom=12&size=400x400&key=AIzaSyDij3hmLUQwFjcHinguhvLwujUGMyGaHgw'].join('')
    return (
    	<div>
  			<ul>	
      		<img src={mapVar}/> 
  			</ul>
      </div>
    );
  }
}

export default GoogleMapStatic;

//'https://maps.googleapis.com/maps/api/staticmap?markers=color:red|'+${coords}+'&zoom=12&size=400x400&key=AIzaSyDij3hmLUQwFjcHinguhvLwujUGMyGaHgw'