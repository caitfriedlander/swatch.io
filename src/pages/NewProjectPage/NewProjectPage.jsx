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
        <React.Fragment>
                <NavBar 
                    user={this.props.user}
                    handleLogout={this.props.handleLogout}
                />
            <div className="NewProjectPage">
                    <NewProjectForm 
                        handleCreateProject={this.props.handleCreateProject}
                        updateMessage={this.updateMessage}
                        {...this.props}
                    />
            </div>
        </React.Fragment>
    )}
}

export default NewProjectPage;