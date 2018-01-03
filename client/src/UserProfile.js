import React, { Component } from 'react';
import NewActivity from './NewActivity';

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
        <NewActivity user={this.props.user} />
      </div>
    );
  }
}

export default UserProfile;
