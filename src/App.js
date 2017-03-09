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
import SignOut from './SignOut.js'
//import FB from 'fb';


var config = {
        apiKey: "AIzaSyDy9_RT6lPT92izSD2TbYQBgm5-W6Vhwlo",
        authDomain: "workout-app-e4142.firebaseapp.com",
        databaseURL: "https://workout-app-e4142.firebaseio.com",
        storageBucket: "workout-app-e4142.appspot.com",
        messagingSenderId: "1050126888209"
      };
      firebase.initializeApp(config);

// const auth = firebase.auth();
// auth.createUserWithEmailAndPassword('email@gmail.com', "password").catch(function (error){
//   var errorCode = error.code;
//   var erorMesage = error.message;
// });


// var user = firebase.auth().currentUser;

// if (user) {
//   console.log('this is your user: *****>>>>>': user)
// } else {
//   console.log('no user found')
// }


// var database = firebase.database()
// var ref = database.ref('users/' + 'userId')
// ref.set({username: 'Bangash'});

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
    if (coord.length > 30) {
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

  // if (coord.length) {
  //   console.log(coord); 
  // }

  if (coord[coord.length -2] && coord[coord.length -1]) {
    var distanceBetweenLastTwoPoints = distance(/*37.7632954, -122.4857721,*/ coord[coord.length -2].Latitude, coord[coord.length -2].Longitude, coord[coord.length -1].Latitude, coord[coord.length -1].Longitude)
    totalDistanceTravelled += (distanceBetweenLastTwoPoints);
    //console.log(totalDistanceTravelled);
    console.log(distanceBetweenLastTwoPoints);
  }

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
      user: null,
      userName:'',
      password:'',
      shoulGetGeoData: false,
      coords: coord,
      coordPosNow: '',
      dbCoordsNow: '', 
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

  }


  tick() {
    this.setState({
      coordPosNow: coord,
    })
  }


  writeUserData (coordArra) {
    firebase.database().ref('users/' + this.state.user.uid).set({
      coord: coord
    });
  }


  getUserCoord () {
    console.log('<<<<<<<<<<<<<<<<<<<')
    const thisVal = this;
    // (function () {
    //   console.log(self)
    // })();
    firebase.database().ref('users/' + this.state.user.uid ).on('value', function(snapshot) {
      //console.log('snapshot:- ' + snapshot.val().coord );
      //const anotherSelf = this;
      if (snapshot.val()) {  
        thisVal.setState({
          dbCoordsNow: snapshot.val().coord,
        });
      }
      console.log(thisVal.state.dbCoordsNow, '>>>>>>>>')
    });
  }

//   var userId = firebase.auth().currentUser.uid;
// return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
//   var username = snapshot.val().username;
//   // 
// });

  componentDidMount() {
    this.timerId = setInterval(() => this.tick(), 3000)
    this.dbtimerId = setInterval(() => this.writeUserData(this.state.coordPosNow), 1000)
    //this.getDbtimerId = setInterval(() => this.getUserCoord(), 1000)
    //this.getUserCoord ();

 


    var val = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log('*************');
        (function () {
          val.setState({
            user: user
          })
        })();
        
        console.log(this.state.user)
      } else {
        // No user is signed in.
        console.log('===========') 
        val.setState({
          user: null
        })
      }
    });

      firebase.database().ref('users/' + this.state.user.uid ).on('value', function(snapshot) {
        //console.log('snapshot:- ' + snapshot.val().coord );
        //const anotherSelf = this;
        if (snapshot.val()) {  
          this.setState({
            dbCoordsNow: snapshot.val().coord,
          });
        }
        console.log(this.state.dbCoordsNow, '>>>>>>>>')
      });


//     var database = firebase.database()
// var ref = database.ref('users')
// ref.set({username: 'Bangash'});
  }

  compnoentWillMount(){
    clearInterval(this.timerId);
    clearInterval(this.dbtimerId);
    clearInterval(this.getDbtimerId);
  }

  render () {    
    //console.log('This is the user {{{{{{{{{{', this.state.user)
    const condition = this.state.coords ? this.state.coords[this.state.coords.length -1] : 'false';
    const showNameIfLoggedin = this.state.user ? this.state.user: false;



    // FB.setAccessToken('access_token');
    // var body = 'My first post using facebook-node-sdk';
    // FB.api('me/feed', 'post', { message: body }, function (res) {
    //   if(!res || res.error) {
    //     console.log(!res ? 'error occurred' : res.error);
    //     return;
    //   }
    //   console.log('Post Id: ' + res.id);
    // });



    //const start = this.state.shoulGetGeoData ? interval : 'false';
    return (
      <div>
        <ul>    
          {
            this.state.user ? <SignOut/> : <SignUp />
            //<h1>You are signed in</h1>  
          }
          { (this.state.user) ? 
            <div style={{float: 'left'}}>
              <h1>Start Running?</h1>
              <button className='buttn' onClick={this.handleSubmit}>Start Running</button>
            </div> : false
          }
        </ul>
        {  this.state.coords.length > 0 && this.state.user ?
          <div style={{float: 'left'}}>
            <LogUserData userData={totalDistanceTravelled} name={showNameIfLoggedin.displayName} pic={showNameIfLoggedin.photoURL}/>
            <GoogleMapStatic coords={this.state.coords[this.state.coords.length -1]} />
            <GoogleWholeRoute coords={this.state.coords} />
          </div>
          : null
        }
        {  this.state.coords.length > 0 && this.state.user ?
          <div style={{float: 'left'}}>           
            <LogUserData userData={totalDistanceTravelled} name={'James'} />
            <GoogleMapStatic coords={this.state.coords[this.state.coords.length -1]} />
            <GoogleWholeRoute coords={this.state.coords} />
          </div>
          : null
        }
        {  this.state.coords.length > 0 && this.state.user ?
          <div style={{float: 'left'}}>
            <ul>
              <h1 style={{color: 'white'}}><span style={{color: 'red'}}>Dani</span> in <span style={{color: 'pink'}}>Tokoyo</span></h1>
            </ul>
            <LogUserData userData={totalDistanceTravelled} name={this.state.value} />
            <GoogleMapStatic coords={{Latitude :35.604456, Longitude: 139.7901791}} />
            <GoogleWholeRoute coords={[{Latitude :35.604561, Longitude: 139.7901791}]} />
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


              // <h1 style={{color: 'white'}}><span style={{color: 'red'}}>Dani</span> in <span style={{color: 'pink'}}>Tokoyo</span></h1>
