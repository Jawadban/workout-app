import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';


const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};


class LogUserData extends React.Component {
  constructor (props) {
    super (props)
    // this.handleUserData = this.handleUserData.bind(this)
    // this.state = {
    //   value: this.props.userData,
    // }
  }

  // handleUserData (event) {
  //   this.setState({
  //     value: this.props.firstName
  //   })
  // }

  // componentWillReceiveProps (nextProps) {
  //   this.setState({
  //     value: nextProps.userData
  //   })
  // }

  render () {
    const user = this.props.name
    return (
      <div style={{float: 'left', marginTop: '65px'}}>
        <ul>
          <MuiThemeProvider>
            <Paper zDepth={1} >
            <Card>
              <CardHeader
                title={this.props.name}
                subtitle={this.props.userData + " Miles Run "}
                avatar={this.props.pic}
                style={{marginRight: '1px'}}
              />     
            </Card> 
            </Paper>
          </MuiThemeProvider>

          <h1 style={{color: 'white'}}>Total miles run</h1>
          <p style={{color: 'red', fontSize: 40}}>{(this.props.userData)} <span style={{color: 'white', fontSize: 40}}>Miles</span></p>
          <h1 style={{color: 'white'}}>Total calories burnt</h1>
          <p style={{color: 'red', fontSize: 40}}>{(this.props.userData*100)} <span style={{color: 'white', fontSize: 40}}>Calories</span></p>
        </ul>
      </div>
    )
  }

}

export default LogUserData;
          // <img src={this.props.pic} style={{ border: '25px'}}/>
          // <h1 style={{color: 'white'}}><span style={{color: 'white'}}>{this.props.name}</span> </h1>

            // <Chip style={{margin: '4'}} 
            // >
            //   <Avatar src={this.props.pic} style={{width: '60px', height: '60px'}} />
             // {this.props.name} 
            // </Chip>
