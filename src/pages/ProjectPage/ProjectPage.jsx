import React from 'react';
import {Link} from 'react-router-dom';
import './ProjectPage.css';
import NavBar from '../../components/NavBar/NavBar';

const ProjectPage = (props) => {

    return(
        <div className="ProjectPage">
            <NavBar 
                user={props.user}
                handleLogout={props.handleLogout}
            />
            <h1>SWATCH.IO PROJECT PAGE</h1>
        </div>
    );
}

export default ProjectPage;