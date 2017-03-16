import React from 'react';
import GoogleWholeRoute from './googleMapWholeRoute.js'
import GoogleMapStatic from './googleStaticMap.js';
import LogUserData from './LogUserData.js'


export default class AllUserData extends React.Component{
	constructor (props) {
		super (props)
	}

	// componentWillReceiveProps (nextProps) {
	// 	if (nextProps.coords.length>0) {	
	// 		//console.log('Iv got Road Map: '+ nextProps.coords[nextProps.coords.length -1].Latitude)
	// 		const newCoords = [];
	// 		nextProps.coords.map(function(coord){
	// 			newCoords.push(coord.Latitude.toString() + ',' + coord.Longitude.toString())
	// 		});
	// 	  this.setState({
	// 	  	coordArr: newCoords.join('|'),
	// 	  	showMap: !this.state.showMap,
	// 	  });
	// 	  console.log('Iv got World Map: '+ newCoords.join('|'))
	// 	}
	// }

	render () {
		return (
			<div style={{float: 'left'}}>           
        <LogUserData userData={this.props.userData} name={this.props.name} pic={this.props.pic}/>
        <GoogleMapStatic coords={this.props.coords[this.props.coords.length -1]} />
        <GoogleWholeRoute coords={this.props.coords} />
      </div>
		);
	}
} 