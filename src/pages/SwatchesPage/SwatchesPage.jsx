import React from 'react';
import {Link} from 'react-router-dom';
import './SwatchesPage.css';
import NavBar from '../../components/NavBar/NavBar';

const SwatchesPage = (props) => {

    return(
        <div className="SwatchesPage">
            <NavBar 
                user={props.user}
                handleLogout={props.handleLogout}
            />
            <h1>SWATCH.IO SWATCHES PAGE</h1>
        </div>
    );
}

export default SwatchesPage;