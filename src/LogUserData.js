import React from 'react';


class LogUserData extends React.Component {
  constructor (props) {
    super (props)
    this.handleUserData = this.handleUserData.bind(this)
    this.state = {
      value: this.props.userData,
    }
  }

  handleUserData (event) {
    this.setState({
      value: this.props.firstName
    })
  }

  // componentWillReceiveProps (nextProps) {
  //   this.setState({
  //     value: nextProps.userData
  //   })
  // }

  render () {
    return (
      <div style={{float: 'left'}}>
        <ul>
          <h1 style={{color: 'black', background:'aqua'}}>Total miles run</h1>
          <p style={{color: 'red', fontSize: 40}}>{(this.props.userData).toFixed(6)} <span style={{color: 'white', fontSize: 40}}>Miles</span></p>
          <h1 style={{color: 'black', background:'aqua'}}>Total calories burnt</h1>
          <p style={{color: 'red', fontSize: 40}}>{(this.props.userData*100).toFixed(4)} <span style={{color: 'white', fontSize: 40}}>Calories</span></p>
        </ul>
      </div>
    )
  }

}

export default LogUserData;
