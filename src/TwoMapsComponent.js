import React from 'react';

class GoogleMapStatic extends React.Component {
	constructor (props) {
			super (props)
			this.state = {
		}
	}

  render () {
    return (
    	<div>
	    	<GoogleMapStatic coords={this.props.coordPosNow[this.props.coordPosNow.length -1]} />
        <GoogleWholeRoute coords={this.props.coords} />
      </div>
    );
  }
}

export default GoogleMapStatic;
