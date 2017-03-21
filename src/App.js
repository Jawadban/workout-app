import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import GoogleMapStatic from './googleStaticMap.js';
import LogUserData from './LogUserData.js'
import { Router, Route, Link, hashHistory } from 'react-router'
import GoogleWholeRoute from './googleMapWholeRoute.js'
//import { withGoogleMap } from "react-google-maps";
//import Map from 'google-maps-react'
import * as firebase from 'firebase';
// import firebaseui from ('firebaseui');
import SignUp from './signUpComponent.js'
import LogIn from './loginComponent.js'
import SignOut from './SignOut.js'
import {getGeoLocation,  totalDistanceTravelled} from './GetUserCoords.js'
import FB from 'fb';
import {config} from './FireBaseAutConfig.js'
import AllUserData from './RenderUserData.js'
import StartRunning from './StartRunning.js'
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


// coord keeps the user location coordinates from the getUserLocation function
export var coord = [];

// Google Firebase initialized to use from FireBaseAutConfig 
// file where the Firebase coniguration lives
firebase.initializeApp(config);

class App extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      user: null,
      // userName:'',
      // password:'',
      shoulGetGeoData: false,
      coords: [],
      coordPosNow: coord,
      dbCoordsNow: '', 
      intervalId: null,
      timerId: null,
      timeStamp: new Date(),
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
    const thisInst = this;

    event.preventDefault()

    var timeStamp = new Date()
    // Math.floor(Date.now() / 1000)
    this.setState({
      timeStamp: timeStamp,
    })
    console.log(this.state.timeStamp)

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
            //console.log(thisInst.state.coords, 'SSSETTTT STTATE COORDS')
          }
          , 1000)
      });
    }
    
    // Time Stamping for database 'coord' insertion purposes
    var timeStampForThisRunningInstance = this.state.timeStamp

    // This setInterval is for updating state 'coords' and to update firebase database with 'coord' 
    // Which are time stamped.
    if(this.state.timerId) {
      clearInterval(this.state.timerId);
      this.setState({
        timerId: null
      });
    } else {
      this.setState({
        timerId: setInterval(
          () => {
            // Here we are linking our firebase database with the user location coordinates 'coord'
            var database = firebase.database()
            var ref = database.ref('users/' + this.state.user.uid + '/run/' + timeStampForThisRunningInstance )
            ref.set({
              coord: coord,
            });

            var userDetailsInsersion = database.ref('users/' + this.state.user.uid + '/userDetails')
            userDetailsInsersion.set({
              userName: thisInst.state.user.displayName,
              userPic: thisInst.state.user.photoURL,
            });

            // Here the 'coords' that we are feeding to our render 
            // screens are set to 'coord' from the getGeoLocation function
            thisInst.setState({
              coords: coord,
            })
          }
          , 500)
      });
    }


    clearInterval(this.state.timerId);
  }


  tick() {
    this.setState({
      coordPosNow: coord,
    })
  }


  writeUserInfoDetails (coordArra) {
    firebase.database().ref('users/' + this.state.user.uid + '/userDetails').set({
      coord: coord
    });
  }


  getUserInfoDetails () {
    console.log('<<<<<<<<<<<<<<<<<<<')
    const thisVal = this;

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

  componentDidMount() {
    this.timerId = setInterval(() => this.tick(), 3000)

    // this.writeUserData(this.state.coordPosNow)

    // if(this.state.user){  
    //   firebase.database().ref('users/' + this.state.user.uid).set({
    //     coord: coord
    //   });
    // }


    // setInterval( () => {

    //   var database = firebase.database()
    //   var ref = database.ref('users/' + this.state.user.uid + '/run' )
    //   ref.set({coord: coord});
    // }, 1000
    // )



    // if (this.state.user && coord) {
    // }

// function writeUserData(userId, name, email, imageUrl) {
//   firebase.database().ref('users/' + 'userId').set({
//     username: 'name',
//     email: 'email',
//     profile_picture : imageUrl
//   });
// }

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
        
        // console.log(this.state.user)
      } else {
        // No user is signed in.
        console.log('===========') 
        val.setState({
          user: null
        })
      }
    });

    this.state.user ?
    firebase.database().ref('users/' + this.state.user.uid ).on('value', function(snapshot) {
      //console.log('snapshot:- ' + snapshot.val().coord );
      if (snapshot.val()) {  
        this.setState({
          dbCoordsNow: snapshot.val().coord,
        });
      }
      console.log(this.state.dbCoordsNow, '>>>>>>>>')
    })
    : null

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
    // const condition = this.state.coords ? this.state.coords[this.state.coords.length -1] : 'false';
    const showNameIfLoggedin = this.state.user ? this.state.user: false;
    // console.log(this.state.user, 'THIS IS USER')

    return (
      <div>
        <ul>    
          {
            this.state.user ? <SignOut/> : <SignUp />
            //<h1>You are signed in</h1>  
          }
          { (this.state.user) ? 
            <div style={{float: 'left', marginTop: '25px'}}>
            <MuiThemeProvider>
            <Card>
              <CardHeader
                title={showNameIfLoggedin.displayName}
                subtitle={totalDistanceTravelled + " Miles Run "}
                avatar={showNameIfLoggedin.photoURL}
              />     
                <RaisedButton label="Start Running" primary={true} onClick={this.handleSubmit}></RaisedButton>
                <RaisedButton label="Push Ups /\ \//\//\ /\" primary={true} onClick={this.handleSubmit} ><Link to="/PushUps"/></RaisedButton>

            </Card> 
              </MuiThemeProvider>
            </div> : false
          }
        </ul>
        {
          this.state.coords[0] && this.state.user ?
            <AllUserData coords={this.state.coords} userData={totalDistanceTravelled} 
            name={showNameIfLoggedin.displayName} pic={showNameIfLoggedin.photoURL}/> : false
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
      </div>
    );
  }

}

export default App;


              // <button className='buttn' onClick={this.handleSubmit}>Start Running</button>

          // { (this.state.user) ? 
          //   <StartRunning /> : false
          // }
                //<ul role="nav">
               //   <li><Link to="/PushUps">PushUps</Link></li>
                //</ul>
