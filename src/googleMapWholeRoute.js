import React from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


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
    	//console.log('Iv got Road Map: '+ nextProps.coords[nextProps.coords.length -1].Latitude)
    	const newCoords = [];
    	nextProps.coords.map(function(coord){
    		newCoords.push(coord.Latitude.toString() + ',' + coord.Longitude.toString())
    	});
	    this.setState({
	    	coordArr: newCoords.join('|'),
	    	showMap: !this.state.showMap,
	    });
	    // console.log('Iv got World Map: '+ newCoords.join('|'))
    }
  }

  render () {
  const mapApiCall = ['http://maps.googleapis.com/maps/api/staticmap?size=400x400&key=AIzaSyDij3hmLUQwFjcHinguhvLwujUGMyGaHgw&path=' + this.state.coordArr + '&markers=color:red|' + this.state.coordArr]
  const showMapOrNot = this.state.showMap? <img src={mapApiCall}/> : 'Map path is getting updated';
    return (
    	<div style={{float: 'left'}}>
        <ul>  
          <h1 style={{color: 'white'}}>Your whole Route</h1>
          <MuiThemeProvider>
              <Paper zDepth={5} >
      	  <img src={mapApiCall} /> 
              </Paper >
        </MuiThemeProvider>

        </ul>  
      </div>
    );
  }
}

export default GoogleWholeRoute;

// style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 #00bcd4'}}
