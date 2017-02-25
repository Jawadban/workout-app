import React from 'react';

//const React = require('react')
//const coords = '37.7837403,-122.40905780000001';
class GoogleWholeRoute extends React.Component {
	constructor (props) {
		super (props)
		this.state = {
			coordArr: null,
			coordArrForPins: '37.7837403,-122.40905780000001|37.7870018,-122.4162339',
			showMap: false,
		}
	}

	componentWillReceiveProps (nextProps) {
    if (nextProps.coords.length>0) {	
    	console.log('Iv got Road Map: '+ nextProps.coords[nextProps.coords.length -1].Latitude)
    	const newCoords = [];
    	nextProps.coords.map(function(coord){
    		newCoords.push(coord.Latitude.toString() + ',' + coord.Longitude.toString())
    	});
	    this.setState({
	    	coordArr: newCoords.join('|'),
	    	showMap: !this.state.showMap,
	    });
	    console.log('Iv got World Map: '+ newCoords.join('|'))
    }
  }

  render () {
  const mapApiCall = ['http://maps.googleapis.com/maps/api/staticmap?size=400x400&key=AIzaSyDij3hmLUQwFjcHinguhvLwujUGMyGaHgw&path=' + this.state.coordArr + '&markers=color:red|' + this.state.coordArr]
  const showMapOrNot = this.state.showMap? <img src={mapApiCall}/> : 'Once you click stop you will see Full route map';
    return (
    	<div>
      	{showMapOrNot}
      </div>
    );
  }
}

export default GoogleWholeRoute;
