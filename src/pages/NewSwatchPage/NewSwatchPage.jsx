import React from 'react';
import './NewSwatchPage.css';
import NavBar from '../../components/NavBar/NavBar';
import NewSwatchForm from '../../components/NewSwatchForm/NewSwatchForm';

class NewSwatchPage extends React.Component {
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
                <div className="NewSwatchPage">
                        <NewSwatchForm 
                            handleCreateSwatch={this.props.handleCreateSwatch}
                            updateMessage={this.updateMessage}
                            {...this.props}
                        />
                </div>
            </React.Fragment>
        )
    }
}


export default NewSwatchPage;