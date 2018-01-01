import React, { Component } from 'react';
import NewActivity from './NewActivity';
import Logout from './Logout';

class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    };
  }

  render() {
    return (
      <div className='UserProfileBox'>
        <p>Hello, {this.props.user.name}!</p>
        <a onClick={this.props.logout}>Logout</a>
        <NewActivity />
      </div>
    );
  }
}

export default UserProfile;
