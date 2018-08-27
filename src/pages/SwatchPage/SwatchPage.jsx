import React from 'react';
import {Link} from 'react-router-dom';
import './SwatchPage.css';
import NavBar from '../../components/NavBar/NavBar';

const SwatchPage = (props) => {

    return(
        <div className="SwatchPage">
            <NavBar 
                user={props.user}
                handleLogout={props.handleLogout}
            />
            <h1>SWATCH.IO SWATCH PAGE</h1>
        </div>
    );
}

export default SwatchPage;