import React from 'react';
import GoogleWholeRoute from '../googleMapsComponents/WholeRoute.js'
import GoogleMapStatic from '../googleMapsComponents/CurrentLocationMap.js';
import LogUserData from './LogUserData.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



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
			<div style={{float: 'left',}}>     
        <LogUserData userData={this.props.userData} name={this.props.name} pic={this.props.pic}/>
        <GoogleMapStatic coords={this.props.coords[this.props.coords.length -1]} />
        <GoogleWholeRoute coords={this.props.coords} />
      </div>
		);
	}
} 