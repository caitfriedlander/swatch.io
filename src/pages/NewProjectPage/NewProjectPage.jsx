import React from 'react';
import './NewProjectPage.css';
import NavBar from '../../components/NavBar/NavBar';
import NewProjectForm from '../../components/NewProjectForm/NewProjectForm';

class NewProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: ''}
  }

  updateMessage = (msg) => {
    this.setState({message: msg});
  }

  render() {
    return (
        <div className="NewProjectPage">
            <NavBar 
                user={this.props.user}
                handleLogout={this.props.handleLogout}
            />
            <h1>NEW PROJECT PAGE</h1>
            <NewProjectForm 
                handleCreateProject={this.props.handleCreateProject}
                updateMessage={this.updateMessage}
                {...this.props}
            />
        </div>
    )}
}

export default NewProjectPage;