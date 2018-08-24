import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import './App.css';
import userService from '../../utils/userService';
import NavBar from '../../components/NavBar/NavBar';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import LandingPage from '../LandingPage/LandingPage';
import HomePage from '../HomePage/HomePage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  /*---------- Helper Methods ----------*/

  /*---------- Callback Methods ----------*/

  handleLogout = () => {
    userService.logout();
    this.setState({user: null});
  }

  handleSignup = () => {
    this.setState({
      user: userService.getUser()
    });
  }
  
  handleLogin = () => {
    this.setState({
      user: userService.getUser()
    });
  }

  /*---------- Lifecycle Methods ----------*/

  componentDidMount() {
    let user = userService.getUser();
    this.setState({user});
  }

  /*---------- Render ----------*/

  render() {
    return (
      <div className="App">
        <h1>Swatch.io</h1>
        <Router>
          <React.Fragment>
            <NavBar 
              user={this.state.user}
              handleLogout={this.handleLogout}
            />
            <Switch>
              <Route exact path='/' render={(props) => (
                userService.getUser() ?
                <HomePage />
                :
                <LandingPage />
              )}/>
              <Route exact path='/signup' render={(props) => 
                <SignupPage {...props}
                  handleSignup={this.handleSignup}
                />
              }/>
              <Route exact path='/login' render={(props) => 
                <LoginPage
                  {...props}
                  handleLogin={this.handleLogin}
                />
              }/>
            </Switch>
          </ React.Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
