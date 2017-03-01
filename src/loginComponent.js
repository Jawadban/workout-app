import React, { Component } from 'react';
import * as firebase from 'firebase';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      password: '',
    };


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    //this.setState({value: event.target.value});
    const target = event.target;
    //const value = target.type === 'text' ? target.checked : target.value
    const name = target.name;

    this.setState({
      [name]: target.value
    });

    var database = firebase.database()
    var ref = database.ref('users')
    ref.update({username: target.value});

  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);

    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
    // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });

    var database = firebase.database()
    var ref = database.ref('users')
    ref.set({username: this.state.username},);

    event.preventDefault();
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" name='userName' value={this.state.userName} onChange={this.handleChange} />
          Email:
          <input type="email" name='email' value={this.state.email} onChange={this.handleChange} />
          Password:
          <input type="password" name='password' value={this.state.password} onChange={this.handleChange} />
        </label>
        <input type="submit" value="LogIn" />
      </form>
    );
  }
}

export default LogIn;