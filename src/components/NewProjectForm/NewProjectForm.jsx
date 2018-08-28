import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './NewProjectForm.css';
import projectAPI from '../../utils/projectAPI';

class NewProjectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
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
    projectAPI.create(this.state)
    .then(project => {
        this.props.handleCreateProject(project);
        this.props.history.push('/');
    });

  }

  isFormInvalid() {
    return !(this.state.name);
  }

  render() {
    return (
        <div className="NewProjectForm">
          <form className="NewProjectForm-Form" onSubmit={this.handleSubmit} >
            <div className="NewProjectForm-Group">
                <p>Creat a project and add swatches to it to keep your collection organized.</p>
                <input type="text" className="form-control" placeholder="Name" value={this.state.name} onChange={(e) => this.handleChange('name', e)} />
            </div>
            <div className="NewProjectForm-Group">
              <div className="NewProjectForm-Buttons">
                <button className="btn default" disabled={this.isFormInvalid()}>SUMBIT</button>
                <Link to='/' className="btn cancel">Cancel</Link>
              </div>
            </div>
          </form>
        </div>
    );
  }
};

export default NewProjectForm;
