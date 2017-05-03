import React from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


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
    			<h1 style={{color: 'white'}}>Your Location</h1>
  				<MuiThemeProvider>
            <Paper zDepth={5} >
    	  			<img src={mapVar} /> 
            </Paper >
      		</MuiThemeProvider>
  			</ul>
      </div>
    );
  }
}

export default GoogleMapStatic;