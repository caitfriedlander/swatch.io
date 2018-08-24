import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from 'react-router-dom';
import './App.css';
import NavBar from '../../components/NavBar/NavBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  /*---------- Helper Methods ----------*/

  /*---------- Callback Methods ----------*/

  /*---------- Lifecycle Methods ----------*/

  render() {
    return (
      <div className="App">
        <h1>Swatch.io</h1>
        <Router>
          <Switch>
            <Route exact path='/' render={() =>
              <NavBar/>
            }/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
