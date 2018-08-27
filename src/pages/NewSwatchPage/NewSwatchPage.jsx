import React from 'react';
import {Link} from 'react-router-dom';
import './NewSwatchPage.css';
import NavBar from '../../components/NavBar/NavBar';

const NewSwatchPage = (props) => {

    return(
        <div className="NewSwatchPage">
            <NavBar 
                user={props.user}
                handleLogout={props.handleLogout}
            />
            <h1>SWATCH.IO NEW SWATCH PAGE</h1>
        </div>
    );
}

export default NewSwatchPage;