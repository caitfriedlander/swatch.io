import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import './App.css';
import userService from '../../utils/userService';
import projectAPI from '../../utils/projectAPI';
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
      user: null,
      swatches: [],
      projects: []
    }
  }

  /*---------- Helper Methods ----------*/
  loadProjects = () => {
    if(this.state.user) {
      projectAPI.index().then(projects => this.setState({projects}));
      // projects are not being saved to state correctly
    }
  }

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
    }, () => {
      this.loadProjects();
    });
  }

  handleCreateProject = (project) => {
    this.setState({
      projects: [...this.state.projects, project]
    });
  }


  /*---------- Lifecycle Methods ----------*/

  componentDidMount() {
    let user = userService.getUser();
    this.setState({user});
    this.loadProjects();
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
                  {...props}
                  user={this.state.user}
                  projects={this.state.projects}
                  handleLogout={this.handleLogout}
                  loadProjects={this.loadProjects}
                />
                :
                <LandingPage 
                  user={this.state.user}
                  handleLogout={this.handleLogout}
                />
              )}/>
              <Route exact path='/projects/new' render={(props) => (
                userService.getUser() ?
                <NewProjectPage 
                  user={this.state.user}
                  handleLogout={this.handleLogout}
                  handleCreateProject={this.handleCreateProject}
                  {...props}
                />
                :
                <Redirect to='/login' />
              )}/>
              <Route exact path='/projects/:project_id' render={(props) => (
                userService.getUser() ?
                <ProjectPage 
                  user={this.state.user}
                  projects={this.state.projects}
                  handleLogout={this.handleLogout}
                  loadProjects={this.loadProjects}
                  {...props}
                />
                :
                <Redirect to='/login' />
              )}/>
              <Route exact path='/swatches/new' render={(props) => (
                userService.getUser() ?
                <NewSwatchPage 
                  user={this.state.user}
                  handleLogout={this.handleLogout}
                  {...props}
                />
                :
                <Redirect to='/login' />
              )}/>
              <Route exact path='/swatches' render={(props) => (
                userService.getUser() ?
                <SwatchesPage 
                  user={this.state.user}
                  handleLogout={this.handleLogout}
                  {...props}
                />
                :
                <Redirect to='/login' />
              )}/>
              <Route exact path='/swatches/:swatch_id' render={(props) => (
                userService.getUser() ?
                <SwatchPage 
                  user={this.state.user}
                  handleLogout={this.handleLogout}
                  loadProjects={this.loadProjects}
                  {...props}
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
