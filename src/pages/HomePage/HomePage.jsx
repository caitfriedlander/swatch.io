import React from 'react';
import {Link} from 'react-router-dom';
import './HomePage.css';
import NavBar from '../../components/NavBar/NavBar';
import RibbonHeader from '../../components/RibbonHeader/RibbonHeader';

const HomePage = (props) => {

    return(
        <div className="HomePage">
            <NavBar 
                user={props.user}
                handleLogout={props.handleLogout}
            />
            <h1>SWATCH.IO HOME PAGE</h1>
            <h2>SWATCHES (0)</h2>
            <p>Swatch gallery</p>
            <Link to='/swatches'>SEE ALL</Link>
            <hr />
            <h2>PROJECTS (0)</h2>
            <p>Project list</p>
        </div>
    );
}

export default HomePage;