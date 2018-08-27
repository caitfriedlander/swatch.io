import React from 'react';
import {Link} from 'react-router-dom';
import './NewProjectPage.css';
import NavBar from '../../components/NavBar/NavBar';

const NewProjectPage = (props) => {

    return(
        <div className="NewProjectPage">
            <NavBar 
                user={props.user}
                handleLogout={props.handleLogout}
            />
            <h1>SWATCH.IO NEW PROJECT PAGE</h1>
        </div>
    );
}

export default NewProjectPage;