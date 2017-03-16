import React from 'react';
import * as firebase from 'firebase';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';



class SignOut extends React.Component {
  constructor (props) {
    super (props)
    this.handleSignOut = this.handleSignOut.bind(this)
    // this.state = {
    //   value: this.props.userData,
    // }
  }

  handleSignOut (event) {
    firebase.auth().signOut().then(function() {
  		// Sign-out successful.
  		console.log('Sign out successful')
		}, function(error) {
		  // An error happened.
		  console.log('ERROR happened while signing out')
		});
  }

  // componentWillReceiveProps (nextProps) {
  //   this.setState({
  //     value: nextProps.userData
  //   })
  // }

  render () {
    return (
      <div style={{float: 'right'}}>  
				<h1 style={{ marginRight: '35px'}}>Sign Out?</h1>
        <MuiThemeProvider>
          <RaisedButton label="Sign Out" primary={true} style={true} onClick={this.handleSignOut}/>
        </MuiThemeProvider>
      </div>
    )
  }

}

export default SignOut;