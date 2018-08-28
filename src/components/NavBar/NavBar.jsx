import React from 'react';
import {Link} from 'react-router-dom';
import './NavBar.css';

const NavBar = (props) => {

  let nav = props.user ?
    <div className="NavBar-Nav">
      <Link to='/' className='NavBar-link' >HOME</Link>
      <Link to='/swatches' className='NavBar-link' >SWATCHES</Link>
      <Link to='/swatches/new' className='NavBar-link' >NEW SWATCH</Link>
      <Link to='' className='NavBar-link' onClick={props.handleLogout} >LOG OUT</Link>
    </div>
    :
    <div className="NavBar-Nav">
      <Link to='/login' className='NavBar-link'>LOG IN</Link>
      <Link to='/signup' className='NavBar-link'>SIGN UP</Link>
    </div>;
  return (
    <div className='NavBar'>
      {nav}
    </div>
  );
};

export default NavBar;