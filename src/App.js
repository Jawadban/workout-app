import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import './googleStaticMap.js';
//import { withGoogleMap } from "react-google-maps";
//import Map from 'google-maps-react'


var user = '';
var coord = [];
var totalDistanceTravelled = 0;

function getGeoLocation () {
  var options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  };

  function success(pos) {
    if (coord.length > 3) {
      return coord;
    }
    var crd = pos.coords;
    //if (crd.length > 0){
      coord.push( {Latitude : crd.latitude,
      Longitude: crd.longitude} );

  };

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  navigator.geolocation.getCurrentPosition(success, error, options);

  if (coord.length) {
  console.log(coord); 
  }

  //console.log(coord);
  setInterval(function(){ getGeoLocation();  
    console.log (coord[coord.length -1]) 
    if (coord[coord.length -2] && coord[coord.length -1]) {
      totalDistanceTravelled += (distance(/*37.7632954, -122.4857721,*/ coord[coord.length -2].Latitude, coord[coord.length -2].Longitude, coord[coord.length -1].Latitude, coord[coord.length -1].Longitude));
      console.log(totalDistanceTravelled);  
    }
  }, 30000);
}

function callGetGeoLoc () {
  setInterval(function(){ getGeoLocation();  
    console.log (coord[coord.length -1]) 
    if (coord[coord.length -2] && coord[coord.length -1]) {
      totalDistanceTravelled += (distance(/*37.7632954, -122.4857721,*/ coord[coord.length -2].Latitude, coord[coord.length -2].Longitude, coord[coord.length -1].Latitude, coord[coord.length -1].Longitude));
      console.log(totalDistanceTravelled);  
    }
  }, 10000);
}

function distance(lat1,lon1,lat2,lon2) {
  var R = 6371; // miles (change this constant to get miles)
  var dLat = (lat2-lat1) * Math.PI / 180;
  var dLon = (lon2-lon1) * Math.PI / 180;
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  //if (d>1) {
    return /*Math.round(d)*/ d/1.6;
  //} else if (d<=1) return Math.round(d*1000)+" meters";
  //var milesDistance = d/1.6;
  //return d;
}

getGeoLocation();




// function initMap () {
//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 3,
//     center: {lat: 0, lng: -180},
//     mapTypeId: 'terrain'
//   });
//   //var flightPlanCoordinates = coord;
//   var flightPlanCoordinates = [
//     {lat: 37.772, lng: -122.214},
//     {lat: 21.291, lng: -157.821},
//     {lat: -18.142, lng: 178.431},
//     {lat: -27.467, lng: 153.027}
//   ];
//   var flightPath = new google.maps.Polyline({
//     path: flightPlanCoordinates,
//     geodesic: true,
//     strokeColor: '#FF0000',
//     strokeOpacity: 1.0,
//     strokeWeight: 2
//   });

//   flightPath.setMap(map);
// }


// class GoogleMap extends React.Component {
//   constructor (props) {
//     super (props)
//   }

//   render () {
//     return (
//         <script async defer
//           src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDij3hmLUQwFjcHinguhvLwujUGMyGaHgw&callback=initMap">
//         </script>
//     );
//   }
// }
//       <img src ='https://maps.googleapis.com/maps/api/js?key=AIzaSyDij3hmLUQwFjcHinguhvLwujUGMyGaHgw&callback=initMap'>
//       </img>


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


// class GoogleMapStatic extends React.Component {
//   constructor (props) {
//     super (props)
//   }
//   render () {
//     return (
//       <img src='https://maps.googleapis.com/maps/api/staticmap?markers=color:red|37.7837403,-122.40905780000001&zoom=12&size=400x400&key=AIzaSyDij3hmLUQwFjcHinguhvLwujUGMyGaHgw' /> 
//     );
//   }
// }

class RecordGeoCoors extends React.Component {
  constructor () {
    super ()
  }
}


class LogUserData extends React.Component {
  constructor (props) {
    super (props)
    this.handleUserData = this.handleUserData.bind(this)
    this.state = {
      value: this.props.userData,
    }

  }

  handleUserData (event) {
    this.setState({
      value: this.props.firstName
    })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      value: nextProps.userData
    })
  }

  render () {
    return (
      <div>
        <ul>
          <li>{this.state.value}</li>
        </ul>
      </div>
    )
  }

}


class App extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      value:'bbc',
      toggle: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({
      value: event.target.value,
    })
  }

  handleSubmit (event) {
    this.setState ({
      toggle: !this.state.toggle,
    });
    event.preventDefault()
    // if (this.toggle) {
    //   callGetGeoLoc();
    // }
  }

  // componentDidMount () {
  //   if (this.state.toggle) {}
  // }

  render () {    
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <p>Please Enter Your Name and Press start to track your locations</p>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <p>{this.state.value}</p>

        <LogUserData userData={this.state.value} />
        <GoogleMapStatic />
      </div>
    );
  }

}
        // <form onSubmit={this.handleSubmit}>
        //   <p>Please Enter Your Name and Press start to track your locations</p>
        //   <input value={firstName} name='firstName' onClick={onSubmit} label='First Name' placeholder='Your First Name Please' />
        //   <input type="submit" value="Submit" />
        // </form>


        // <img src ='https://maps.googleapis.com/maps/api/staticmap?markers=color:red|37.7837403,-122.40905780000001&zoom=12&size=400x400&key=AIzaSyDij3hmLUQwFjcHinguhvLwujUGMyGaHgw'>
        // </img>



// class xApp extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

export default App;
