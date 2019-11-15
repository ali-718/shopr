import React, { Component } from 'react';
import styled from 'styled-components';
import firebase from '../firebase';
import InnerNav from './InnerNav';

const StyledLogin = styled.div`
  .App-header-login button {
    display: flex;
  }

  .App-header-login button {
    background: #e9f1df;
    width: 100px;
    font-size: 12px;
    font-weight: 600;
    color: #333;
    cursor: pointer;
    height: 20px;
    text-align: center;
    border: none;
    background-size: 300% 100%;
    border-radius: 50px;
    moz-transition: all 0.4s ease-in-out;
    -o-transition: all 0.4s ease-in-out;
    -webkit-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
  }
  .App-header-login button:hover {
    opacity: 0.75;
    background-position: 100% 0;
    moz-transition: all 0.4s ease-in-out;
    -o-transition: all 0.4s ease-in-out;
    -webkit-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
  }

  .add-item button:focus {
    outline: none;
  }

  .Pre-login {
    text-align: center;
  }
`;

const StyledLoginPage = styled.div`
  text-align: center;
`;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  handleChange(e) {
    /* ... */
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.setState({
        user: null
      });
    });
  }

  login() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result => {
      const user = result.user;
      this.setState({
        user
      });
      /* for reference, here is what you can get from a user
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      */
    });
  }

  render() {
    return (
      <div>
          <StyledLogin>
            {this.state.user ? (
              <div>
                <div className="App-header-login">
                  Hi, {this.state.user.displayName}
                  <button onClick={this.logout}>Logout</button>
                </div>
                <InnerNav user={this.state.user} />
              </div>
            ) : (
              <StyledLoginPage>
                <h3>login</h3>
                <button onClick={this.login}>Login</button>
              </StyledLoginPage>
            )}
          </StyledLogin>
      </div>
    );
  }
}

export default Login;
