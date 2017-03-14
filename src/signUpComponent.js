import React, { Component } from 'react';
import * as firebase from 'firebase';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.facebookLoginHandle = this.facebookLoginHandle.bind(this)
  }

  // saveUsername (usrNam) {
  //   console.log('Im firing this /\//\/\\/\/\/\/\//\/\/');
  //    firebase.database().ref('users/' + 'userId' + '/userName').set({
  //       username: usrNam
  //     });
  // }

  facebookLoginHandle() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      
      var user = result.user;
      // ...
      console.log('FacebOOOOOOOOOOk user: ', user)
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  handleChange(event) {
    //this.setState({value: event.target.value});
    const target = event.target;
    //const value = target.type === 'text' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: target.value
    });
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    const val = this

    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
    // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      }).then(function(user) {
        return user.updateProfile({displayName: val.state.userName});
      }).catch(function(error) {
        console.log(error);
      });


    //this.saveUsername(val.state.userName)


    //   firebase.database().ref('users/' + 'userId').set({
    //     username: this.state.userName,
    //     email: this.state.email,
    //     //profile_picture : imageUrl
    //   });
    // }
    // writeUserData.bind(this);

    event.preventDefault();
  }

  render() {
    // var provider = new firebase.auth.FacebookAuthProvider();
    // firebase.auth().signInWithPopup(provider).then(function(result) {
    //   // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    //   var token = result.credential.accessToken;
    //   // The signed-in user info.
    //   var user = result.user;
    //   // ...
    // }).catch(function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // The email of the user's account used.
    //   var email = error.email;
    //   // The firebase.auth.AuthCredential type that was used.
    //   var credential = error.credential;
    //   // ...
    // });



    return (
      <div>
        <form onSubmit={this.handleSubmit} style={{float: 'left'}}>
          <label>
            Name:
            <input type="text" name='userName' value={this.state.userName} onChange={this.handleChange} />
            Email:
            <input type="email" name='email' value={this.state.email} onChange={this.handleChange} />
            Password:
            <input type="password" name='password' value={this.state.password} onChange={this.handleChange} />
          </label>
          <input type="submit" value="SignUp" />
        </form>
          <button className='buttn' onClick={this.facebookLoginHandle} style={{float: 'left'}} >Login With Facebook</button>
      </div>
    );
  }
}

export default SignUp;