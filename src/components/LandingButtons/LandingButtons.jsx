import React from 'react';
import {Link} from 'react-router-dom';
import './LandingButtons.css';

const LandingButtons = () => {
  return (
    <div className="LandingButtons">
        <Link to='/login' className='NavBar-link'>LOG IN</Link>
        <Link to='/signup' className='NavBar-link'>SIGN UP</Link>
    </div> 
    );
};

export default LandingButtons;