import React from 'react';
import './SwatchPage.css';
import NavBar from '../../components/NavBar/NavBar';
import SwatchCard from '../../components/SwatchCard/SwatchCard';

const SwatchPage = (props) => {

    return(
        <div className="SwatchPage">
            <NavBar 
                user={props.user}
                handleLogout={props.handleLogout}
            />
            <h1>SWATCH.IO SWATCH PAGE</h1>
            <SwatchCard />
        </div>
    );
}

export default SwatchPage;