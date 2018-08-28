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
            <h2>SWATCHES (0)</h2>
            <div className="HomePage-Swatches">
                <div className="HomePage-Swatch">
                    <div className="img"></div>
                </div>
                <div className="HomePage-Swatch">
                    <div className="img"></div>
                </div>
                <div className="HomePage-Swatch">
                    <div className="img"></div>
                </div>
                <div className="HomePage-Swatch">
                    <div className="img"></div>
                </div>
                <div className="HomePage-Swatch">
                    <div className="img"></div>
                </div>
                <div className="HomePage-Swatch">
                    <div className="img"></div>
                </div>
            </div>
            <div className="HomePage-Buttons">
                <Link to='/swatches' className="btn">SEE ALL</Link>
            </div>
            <hr />
            <h2>PROJECTS ({props.projects.length})</h2>
            <div className="HomePage-Buttons">
                <Link to='/projects/new' className="NewProject-btn">NEW PROJECT</Link>
                {props.projects.map(p => (
                    <div key={p._id}>
                        <Link to={`/projects/${p._id}`} className="Project-btn">{p.name}</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;