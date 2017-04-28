import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// when user clicks the button the setInterval starts running.
// if setInterval is already running the event handler clears the setInterval
export default class StartRunning extends React.Component {

	render () {
		return (
	    <div style={{float: 'left'}}>
	      <MuiThemeProvider>
	        <RaisedButton label="Start Running" primary={true} style={true} onClick={this.handleSubmit}/>
	      </MuiThemeProvider>
	    </div>
	    );
	}
}
