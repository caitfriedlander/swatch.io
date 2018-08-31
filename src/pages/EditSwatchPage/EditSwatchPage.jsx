import React from 'react';
import './EditSwatchPage.css';
import NavBar from '../../components/NavBar/NavBar';
import EditSwatchForm from '../../components/EditSwatchForm/EditSwatchForm';

class EditSwatchPage extends React.Component {
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
                <div className="EditSwatchPage">
                        <EditSwatchForm 
                            handleCreateSwatch={this.props.handleCreateSwatch}
                            updateMessage={this.updateMessage}
                            {...this.props}
                        />
                </div>
            </React.Fragment>
        )
    }
}


export default EditSwatchPage;