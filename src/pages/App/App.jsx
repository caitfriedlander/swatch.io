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
import NewProjectPage from '../NewProjectPage/NewProjectPage';
import ProjectPage from '../ProjectPage/ProjectPage';
import NewSwatchPage from '../NewSwatchPage/NewSwatchPage';
import SwatchesPage from '../SwatchesPage/SwatchesPage';
import SwatchPage from '../SwatchPage/SwatchPage';

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
        <Router>
          <React.Fragment>
            <Switch>
              <Route exact path='/' render={(props) => (
                userService.getUser() ?
                <HomePage 
                  user={this.state.user}
                  handleLogout={this.handleLogout}
                />
                :
                <LandingPage 
                  user={this.state.user}
                  handleLogout={this.handleLogout}
                />
              )}/>
              <Route exact path='/newproject' render={(props) => (
                userService.getUser() ?
                <NewProjectPage 
                  user={this.state.user}
                  handleLogout={this.handleLogout}
                />
                :
                <Redirect to='/login' />
              )}/>
              <Route exact path='/project/:project_id' render={(props) => (
                userService.getUser() ?
                <ProjectPage 
                  user={this.state.user}
                  handleLogout={this.handleLogout}
                />
                :
                <Redirect to='/login' />
              )}/>
              <Route exact path='/newswatch' render={(props) => (
                userService.getUser() ?
                <NewSwatchPage 
                  user={this.state.user}
                  handleLogout={this.handleLogout}
                />
                :
                <Redirect to='/login' />
              )}/>
              <Route exact path='/swatches' render={(props) => (
                userService.getUser() ?
                <SwatchesPage 
                  user={this.state.user}
                  handleLogout={this.handleLogout}
                />
                :
                <Redirect to='/login' />
              )}/>
              <Route exact path='/swatch/:swatch_id' render={(props) => (
                userService.getUser() ?
                <SwatchPage 
                  user={this.state.user}
                  handleLogout={this.handleLogout}
                />
                :
                <Redirect to='/login' />
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
