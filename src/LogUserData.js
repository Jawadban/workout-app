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

  componentWillReceiveProps (nextProps) {
    this.setState({
      value: nextProps.userData
    })
  }

  render () {
    return (
      <div>
        <ul>
          <li>{this.state.value}</li>
        </ul>
      </div>
    )
  }

}

export default LogUserData;
