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
import swatchAPI from '../../utils/swatchAPI';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import LandingPage from '../LandingPage/LandingPage';
import HomePage from '../HomePage/HomePage';
import NewProjectPage from '../NewProjectPage/NewProjectPage';
import ProjectPage from '../ProjectPage/ProjectPage';
import NewSwatchPage from '../NewSwatchPage/NewSwatchPage';
import SwatchesPage from '../SwatchesPage/SwatchesPage';
import SwatchPage from '../SwatchPage/SwatchPage';
import EditSwatchPage from '../EditSwatchPage/EditSwatchPage';

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
    }
  }

  loadSwatches = () => {
    if(this.state.user) {
      swatchAPI.index().then(swatches => this.setState({swatches}));
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
    }, () => {
		this.loadProjects();
		this.loadSwatches();
	});
  }
  
  handleLogin = () => {
    this.setState({
      user: userService.getUser()
    }, () => {
      this.loadProjects();
      this.loadSwatches();
    });
  }

  handleCreateProject = (project) => {
    this.setState({
      projects: [...this.state.projects, project]
    });
  }

  handleCreateSwatch = (swatch) => {
    this.setState({
      swatches: [...this.state.swatches, swatch]
    });
  }

  handleDeleteSwatch = (swatchId) => {
	var newSwatches = [...this.state.swatches];
	var swatchIdx = newSwatches.findIndex(s => s._id === swatchId);
	newSwatches.splice(swatchIdx, 1);
    this.setState({
      swatches: newSwatches
    });
  }

  handleDeleteProject = (projectId) => {
	var newProjects = [...this.state.projects];
	var projectIdx = newProjects.findIndex(p => p._id === projectId);
	newProjects.splice(projectIdx, 1);
    this.setState({
      projects: newProjects
    });
  }


  /*---------- Lifecycle Methods ----------*/

  componentDidMount() {
    let user = userService.getUser();
    this.setState({user}, function() {
      this.loadProjects();
      this.loadSwatches(); 
    });
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
                  swatches={this.state.swatches}
                  handleLogout={this.handleLogout}
                  loadProjects={this.loadProjects}
                  loadSwatches={this.loadSwatches}
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
				  handleLogout={this.handleLogout}
				  handleDeleteProject={this.handleDeleteProject}
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
                  handleCreateSwatch={this.handleCreateSwatch}
                  {...props}
                />
                :
                <Redirect to='/login' />
              )}/>
              <Route exact path='/swatches/:swatch_id/edit' render={(props) => (
                userService.getUser() ?
                <EditSwatchPage 
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
                  swatches={this.state.swatches}
                  loadSwatches={this.loadSwatches}
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
                  projects={this.state.projects}
                  swatch={this.state.swatches.find(s => s._id === props.match.params.swatch_id)}
				  handleLogout={this.handleLogout}
				  handleDeleteSwatch={this.handleDeleteSwatch}
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
