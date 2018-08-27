import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import userService from '../../utils/userService';
import './SignupForm.css';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConf: ''
    };
  }

  handleChange = (field, e) => {
    this.props.updateMessage('');
    this.setState({
      // Using ES2015 Computed Property Names
      [field]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    userService.signup(this.state)
      // successfully signed up - show GamePage
      .then(() => {
        this.props.handleSignup();
        this.props.history.push('/');
      })
      // invalid user data
      .catch(err => this.props.updateMessage(err.message));
  }

  isFormInvalid() {
    return !(this.state.name && this.state.email && this.state.password === this.state.passwordConf);
  }

  render() {
    return (
      <React.Fragment>
        <header className="SignupForm-Headder">
          <h1>Sign Up</h1>
        </header>
        <div className="SignupForm">
          <form className="SignupForm-Form" onSubmit={this.handleSubmit} >
            <div className="SignupForm-Group">
              <input type="text" className="form-control" placeholder="Name" value={this.state.name} onChange={(e) => this.handleChange('name', e)} />
            </div>
            <div className="SignupForm-Group">
              <input type="email" className="form-control" placeholder="Email" value={this.state.email} onChange={(e) => this.handleChange('email', e)} />
            </div>
            <div className="SignupForm-Group">
              <input type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={(e) => this.handleChange('password', e)} />
            </div>
            <div className="SignupForm-Group">
              <input type="password" className="form-control" placeholder="Confirm Password" value={this.state.passwordConf} onChange={(e) => this.handleChange('passwordConf', e)} />
            </div>
            <div className="SignupForm-Group">
              <div className="SignupForm-Buttons">
                <button className="btn default" disabled={this.isFormInvalid()}>Sign Up</button>
                <Link to='/' className="btn cancel">Cancel</Link>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
};

export default SignupForm;
