import React from 'react';
import {Link} from 'react-router-dom';
import './HomePage.css';
import NavBar from '../../components/NavBar/NavBar';

const HomePage = (props) => {
    return(
        <div className="HomePage">
            <NavBar 
                user={props.user}
                handleLogout={props.handleLogout}
            />
            <h1>HOME</h1>
            <h2>SWATCHES (0)</h2>
            <p>Swatch gallery</p>
            <Link to='/swatches'>SEE ALL</Link>
            <hr />
            <h2>PROJECTS ({props.projects.length})</h2>
            <div>
            <ul>
                {props.projects.map(p => (
                    <li key={p._id}>
                        {console.log(p)}
                        <Link to={`/projects/${p._id}`}>{p.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
            <Link to='/projects/new'>NEW PROJECT</Link>
        </div>
    );
}

export default HomePage;