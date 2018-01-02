import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom';
import './App.css';
import Signup from './Signup';
import Login from './Login';
import Logout from './Logout';
import Home from './Home';
import UserProfile from './UserProfile';
import ActivityLog from './ActivityLog';
import axios from 'axios';
import { Row, Col, Navbar, NavItem, Button } from 'react-materialize';
import Modal from 'react-modal';
// import 'react-select/dist/react-select.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding: '25px',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgb(196, 50, 53)'
  }
};

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      user: {},
      loginIsOpen: false,
      signUpIsOpen: false
    }
    this.liftTokenToState = this.liftTokenToState.bind(this)
    this.logout = this.logout.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openSignUp = this.openSignUp.bind(this);
    this.afterOpenSignUp = this.afterOpenSignUp.bind(this);
    this.closeSignUp = this.closeSignUp.bind(this);
  }

  liftTokenToState(data) {
    this.setState({token: data.token, user: data.user})
  }

  logout() {
    localStorage.removeItem('mernToken')
    this.setState({
      token: '',
      user: {}
    })
  }

  componentDidMount() {
    // If there is a token in localStorage
    var token = localStorage.getItem('mernToken')
    if (token === 'undefined' || token === null || token === '' || token === undefined) {
      localStorage.removeItem('mernToken')
      this.setState({
        token: '',
        user: {}
      })
    } else {
      //   Validate the token against the server
      axios.post('/auth/me/from/token', {
        token: token
      }).then(response => {
        //   Store the token and user
        localStorage.setItem('mernToken', response.data.token)
        this.setState({
          token: response.data.token,
          user: response.data.user
        })
        //   Pass User into child components and display main app
      }).catch(err => {
        // Both the JWT and db errors will be caught here
        console.log(err)
      })
    }
  }

  openModal() {
    this.setState({ loginIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ loginIsOpen: false });
  }

  openSignUp() {
    this.setState({ signUpIsOpen: true });
  }

  afterOpenSignUp() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeSignUp() {
    this.setState({ signUpIsOpen: false });
  }

  render() {
    var theUser = this.state.user
    if (typeof this.state.user === 'object' && Object.keys(this.state.user).length !== 0) {
      return (
        <Router>
          <div className='App'>
            <Navbar>
              <li><NavLink to='/profile'>Profile</NavLink></li>
              <li><NavLink to='/activities'>MyLog</NavLink></li>
              <li onClick={this.logout}><NavLink to='/'>Log Out</NavLink></li>
            </Navbar>
            <Route path='/profile' render={(props) => (
              <UserProfile {...props} user={this.state.user} logout={this.logout} />
            )} />
            <Route path='/activities' render={(props) => (
              <ActivityLog {...props} user={this.state.user} />
            )} />
            <Route exact path='/' component={Home} />
          </div>
        </Router>
      );
    } else {
      return (
        <Router>
          <div className='App'>
            <Navbar>
              <li ><a onClick={this.openModal} >Login</a></li>
              <li ><a onClick={this.openSignUp} >Sign Up</a></li>
            </Navbar>
            <Modal
              isOpen={this.state.loginIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Login Modal"
            >
              <h2 className="purpleShade" ref={subtitle => this.subtitle = subtitle}>Login</h2>
              <Login lift={this.liftTokenToState} />
              <Button className="fltRight" onClick={this.closeModal}>Cancel</Button>
            </Modal>
            <Modal
              isOpen={this.state.signUpIsOpen}
              onAfterOpen={this.afterOpenSignUp}
              onRequestClose={this.closeSignUp}
              style={customStyles}
              contentLabel="Sign Up Modal"
            >
              <h2 className="purpleShade" ref={subtitle => this.subtitle = subtitle}>Sign Up</h2>
              <Signup lift={this.liftTokenToState} />
              <Button className="inline" onClick={this.closeSignUp}>Cancel</Button>
            </Modal>
            <Home />
          </div>
        </Router>
      );
    }
  }
}

export default App;
