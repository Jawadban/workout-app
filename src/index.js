import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Router, Route, Link } from 'react-router'
import * as firebase from 'firebase';
// import firebaseui from 'firebaseui'


var config = {
        apiKey: "AIzaSyDy9_RT6lPT92izSD2TbYQBgm5-W6Vhwlo",
        authDomain: "workout-app-e4142.firebaseapp.com",
        databaseURL: "https://workout-app-e4142.firebaseio.com",
        storageBucket: "workout-app-e4142.appspot.com",
        messagingSenderId: "1050126888209"
      };
      firebase.initializeApp(config);

var database = firebase.database()
var ref = database.ref('users')
ref.set({username: 'Bangash'});


// const firebaseui = global.firebaseui;
// const authUi = new firebaseui.auth.AuthUI(firebase.auth());

// var uiConfig = {
//   'signInSuccessUrl': './',
//   'signInOptions': [
//     // Leave the lines as is for the providers you want to offer your users.
//     firebase.auth.EmailAuthProvider.PROVIDER_ID
//   ],
//   // Terms of service url.
//   'tosUrl': './terms.html',
// };

// // The start method will wait until the DOM is loaded.
// authUi.start('#firebaseui-auth-container', uiConfig);

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


// firebase.auth().signInWithEmailandPassword('email@gmail.com', "password").catch(function (error){
// 	var errorCode = error.code;
// 	var erorMesage = error.message;
// })


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
