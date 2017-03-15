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
import {getGeoLocation, coord, totalDistanceTravelled} from './GetUserCoords.js'
//import FB from 'fb';
import {config} from './FireBaseAutConfig.js'
import AllUserData from './RenderUserData.js'


firebase.initializeApp(config);

class App extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      user: null,
      userName:'',
      password:'',
      shoulGetGeoData: false,
      coords: coord,
      coordPosNow: coord,
      dbCoordsNow: '', 
      intervalId: null,
      timerId: null,
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
          function () {
            getGeoLocation ()
            console.log(coord, 'These are the user coords')
          }
          , 3000)
      });
    }

    // var starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
    // starCountRef.on('value', function(snapshot) {
    //   updateCoord(postElement, snapshot.val());
    // }); 

    clearInterval(this.state.timerId);
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
// });


  componentDidMount() {
    this.timerId = setInterval(() => this.tick(), 3000)
    // if (coord) {
    //   this.setState({
    //     coordPosNow: coord,
    //   })
    // }

    // this.dbtimerId = setInterval(() => this.writeUserData(this.state.coordPosNow), 1000)
    //this.getDbtimerId = setInterval(() => this.getUserCoord(), 1000)
    //this.getUserCoord ();
    if (this.user) {
      () => this.writeUserData(this.state.coordPosNow)
    }

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

        {
          this.state.coords.length > 0 && this.state.user ?
            <AllUserData coords={this.state.coords} userData={totalDistanceTravelled}/> : false
        }

        {  
          
          this.state.coords.length > 0 && this.state.user ?
          <div style={{float: 'left'}}>
            <ul>
              <h1 style={{color: 'white'}}><span style={{color: 'red'}}>Dani</span> in <span style={{color: 'pink'}}>Tokoyo</span></h1>
            </ul>
            <AllUserData coords={[{Latitude :35.604561, Longitude: 139.7901791}]} userData={totalDistanceTravelled}/>
          </div>
          : null
        }

        {
          this.state.coords.length > 0 && this.state.user ?
            <AllUserData coords={this.state.coords} userData={totalDistanceTravelled}/> : false
        }
      </div>
    );
  }

}

export default App;
