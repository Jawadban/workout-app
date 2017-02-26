import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import GoogleMapStatic from './googleStaticMap.js';
import LogUserData from './LogUserData.js'
import { Router, Route, Link } from 'react-router'
import GoogleWholeRoute from './googleMapWholeRoute.js'
//import { withGoogleMap } from "react-google-maps";
//import Map from 'google-maps-react'
import * as firebase from 'firebase';
// import firebaseui from ('firebaseui');
import SignUp from './signUpComponent.js'
import LogIn from './loginComponent.js'

var config = {
        apiKey: "AIzaSyDy9_RT6lPT92izSD2TbYQBgm5-W6Vhwlo",
        authDomain: "workout-app-e4142.firebaseapp.com",
        databaseURL: "https://workout-app-e4142.firebaseio.com",
        storageBucket: "workout-app-e4142.appspot.com",
        messagingSenderId: "1050126888209"
      };
      firebase.initializeApp(config);


var user = firebase.auth().currentUser;

if (user) {
  console.log('this is your user')
} else {
  console.log('no user found')
}

const auth = firebase.auth();
auth.createUserWithEmailAndPassword('email@gmail.com', "password").catch(function (error){
  var errorCode = error.code;
  var erorMesage = error.message;
});

var database = firebase.database()
var ref = database.ref('users')
ref.set({username: 'Bangash'});


// function writeUserData(userId, name, email, imageUrl) {
//   firebase.database().ref('users/' + 'userId').set({
//     username: 'name',
//     email: 'email',
//     profile_picture : imageUrl
//   });
// }

//var user = '';
var coord = [];
var totalDistanceTravelled = 0;

function getGeoLocation () {
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
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

  if (coord[coord.length -2] && coord[coord.length -1]) {
    totalDistanceTravelled += (distance(/*37.7632954, -122.4857721,*/ coord[coord.length -2].Latitude, coord[coord.length -2].Longitude, coord[coord.length -1].Latitude, coord[coord.length -1].Longitude));
      console.log(totalDistanceTravelled);
  }

  //console.log(coord);

  // setInterval(function(){ getGeoLocation();  
  //   console.log (coord[coord.length -1]) 
  //   if (coord[coord.length -2] && coord[coord.length -1]) {
   //  totalDistanceTravelled += (distance(/*37.7632954, -122.4857721,*/ coord[coord.length -2].Latitude, coord[coord.length -2].Longitude, coord[coord.length -1].Latitude, coord[coord.length -1].Longitude));
  //     console.log(totalDistanceTravelled);  
  //   }
  // }, 10000);

}

// function callGetGeoLoc () {
//   setInterval(function(){ getGeoLocation();  
//     console.log (coord[coord.length -1]) 
//     if (coord[coord.length -2] && coord[coord.length -1]) {
 //     totalDistanceTravelled += (distance(/*37.7632954, -122.4857721,*/ coord[coord.length -2].Latitude, coord[coord.length -2].Longitude, coord[coord.length -1].Latitude, coord[coord.length -1].Longitude));
//       console.log(totalDistanceTravelled);  
//     }
//   }, 10000);
// }

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

//getGeoLocation();




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



// class DisplayTotalDistance extends React.Component {
//   constructor () {
//     super ()
//   }
//   render() {
//     return (

//     );
//   }
// }



class App extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      userName:'',
      password:'',
      shoulGetGeoData: false,
      coords: coord,
      coordPosNow: '', 
      intervalId: null,
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
    // console.log('before setState', this.state.shoulGetGeoData)

    // this.setState ({
    //   shoulGetGeoData: !this.state.shoulGetGeoData,
    // });
    // console.log('after setState', this.state.shoulGetGeoData)
    event.preventDefault()

    if(this.state.intervalId) {
      clearInterval(this.state.intervalId);
      this.setState({
        intervalId: null
      });
    } else {
      this.setState({
        intervalId: setInterval(
          getGeoLocation
          , 3000)
      });
    }

    // var starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
    // starCountRef.on('value', function(snapshot) {
    //   updateCoord(postElement, snapshot.val());
    // });

    // function ifTrueRunGeoLoc () {
    //   if (this.state.shoulGetGeoData) {
    //     setTimeout ( function () {
    //       getGeoLocation();
    //       console.log ('started: ' + this.state.shoulGetGeoData);
    //       if (this.state.shoulGetGeoData) {
    //         ifTrueRunGeoLoc.call(this)
    //       }
    //     }.bind(this)
    //     , 3000)
    //   } 
    // }
    // ifTrueRunGeoLoc();
    // console.log('bananas')

  }


  tick() {
    this.setState({
      coordPosNow: coord,
    })
  }

  writeUserData( coordArra) {
    firebase.database().ref('users/' + 'userId').set({
      username: 'name',
      coord: coordArra,
    });
  }

  getUserCoord( coordArra) {
    firebase.database().ref('users/' + 'userId').set({
      username: 'name',
      coord: coordArra,
    });
  }

  componentDidMount() {
    this.timerId = setInterval(() => this.tick(), 3000)
    this.dbtimerId = setInterval(() => this.writeUserData(this.state.coordPosNow), 1000)
//     var database = firebase.database()
// var ref = database.ref('users')
// ref.set({username: 'Bangash'});
  }

  compnoentWillMount(){
    clearInterval(this.timerId);
    clearInterval(this.dbtimerId);
  }

  render () {    
    const condition = this.state.coords ? this.state.coords[this.state.coords.length -1] : 'false';
    //const start = this.state.shoulGetGeoData ? interval : 'false';

    return (
      <div>

        <ul>  
          <LogIn />
          <h1>Start Running?</h1>
          <button style={{backgroundColor: 'blue',
          color: 'white',
          padding: '10px 20px',
          textAlign: 'center',
          textDecoration: 'none',
          display: 'inline-block',
          fontSize: '12px',}}onClick={this.handleSubmit}>Start Running</button>
        </ul>
        {  this.state.coords.length > 0 ?
          <div>
            <LogUserData userData={totalDistanceTravelled} name={this.state.value} />
            <GoogleMapStatic coords={this.state.coordPosNow[this.state.coordPosNow.length -1]} />
            <GoogleWholeRoute coords={this.state.coords} />
          </div>
          : null
        }
      </div>
    );
  }

}

export default App;
        // <form onSubmit={this.handleChange}>
        //   <label>
        //     <ul>  
        //       <p>Please Enter Your Name and Press start to track your locations</p>
        //      <input type="text" value={this.state.value} />
        //       <input type="password" value={this.state.value} />
        //       <input type="submit" value="Submit" />
        //     </ul>
        //   </label>
        // </form>
