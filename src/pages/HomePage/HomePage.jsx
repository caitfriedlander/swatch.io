import React from 'react';
import {Link} from 'react-router-dom';
import './HomePage.css';
import NavBar from '../../components/NavBar/NavBar';
import RibbonHeader from '../../components/RibbonHeader/RibbonHeader';

const HomePage = (props) => {

    return(
        <div className="HomePage">
            <RibbonHeader />
            <h1>SWATCH.IO HOME PAGE</h1>
            <NavBar 
                user={props.user}
                handleLogout={props.handleLogout}
            />
        </div>
    );
}

export default HomePage;