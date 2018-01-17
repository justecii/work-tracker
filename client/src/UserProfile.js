import React, { Component } from 'react';
import Goals from './Goals';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom';

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
        <Router>
          <div>
              <NavLink to='/goals'>Goals</NavLink>
              <Route path='/goals' render={(props) => (
                <Goals {...props} user={this.props.user} />
              )} />
          </div>
        </Router>
      </div>
    );
  }
}

export default UserProfile;
