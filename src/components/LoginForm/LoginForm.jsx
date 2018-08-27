import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import userService from '../../utils/userService';
import './LoginForm.css';
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pw: ''
    }
  }

  handleChange = (field, e) => {
    // TODO: implement in an elegant way
    this.setState({
      [field]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    userService.login(this.state)
      .then(() => {
        this.props.handleLogin();
        this.props.history.push('/');
      })
    .catch(err => alert('Invalid Credentials'));
  }

  render() {
    return (
      <div className="LoginForm">
        <form className="LoginForm-Form" onSubmit={this.handleSubmit} >
          <div className="LoginForm-Group">
            <input type="email" className="form-control" placeholder="Email" value={this.state.email} onChange={(e) => this.handleChange('email', e)} />
          </div>
          <div className="LoginForm-Group">
            <input type="password" className="form-control" placeholder="Password" value={this.state.pw} onChange={(e) => this.handleChange('pw', e)} />
          </div>
          <div className="LoginForm-Group">
            <div className="LoginForm-Buttons">
              <button className="btn default">LOG IN</button>
              <Link to='/' className="btn cancel">CANCEL</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
};

export default LoginForm;