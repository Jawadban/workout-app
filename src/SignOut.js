import React from 'react';
import * as firebase from 'firebase';

// // {{backgroundColor: 'blue',
//         color: 'white',
//         padding: '10px 20px',
//         textAlign: 'center',
//         textDecoration: 'none',
//         display: 'inline-block',
//         fontSize: '12px', 
//         width: '12em',}}

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
        <button className='buttn' onClick={this.handleSignOut}>Sign Out</button>
      </div>
    )
  }

}

export default SignOut;