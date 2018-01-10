import React, { Component } from 'react';

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
        <p>Additional functionality soon - <br/> i.e. Goal Setting, fitness tracking</p>
        <a onClick={this.props.logout}>Logout</a>
      </div>
    );
  }
}

export default UserProfile;
