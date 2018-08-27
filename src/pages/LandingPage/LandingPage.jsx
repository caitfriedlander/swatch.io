import React from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css';
import RibbonHeader from '../../components/RibbonHeader/RibbonHeader';

const LandingPage = (props) => {

    return(
        <div className="LandingPage">
            <RibbonHeader />
            <h1>SWATCH.IO LANDING PAGE</h1>
            <div className="LandingPage-Buttons">
                <Link to='/login' className='NavBar-link'>LOG IN</Link>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <Link to='/signup' className='NavBar-link'>SIGN UP</Link>
            </div>
        </div>
    );
}

export default LandingPage;