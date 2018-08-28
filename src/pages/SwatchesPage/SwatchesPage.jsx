import React from 'react';
import {Link} from 'react-router-dom';
import './SwatchesPage.css';
import NavBar from '../../components/NavBar/NavBar';

const SwatchesPage = (props) => {

    return(
        <div>
            <NavBar 
                user={props.user}
                handleLogout={props.handleLogout}
            />
            <div className="SwatchesPage">    
                <div className="SwatchesPage-DDs">
                    <Link to='#' className="dd">COLOR</Link>
                    <Link to='#' className="dd">TYPE</Link>
                </div>
                <div className="SwatchesPage-Swatches">
                    <div className="SwatchesPage-Swatch">
                        <div className="img"></div>
                        <h4>Name / Color</h4>
                        <p>4 YDS</p>
                    </div>
                    <div className="SwatchesPage-Swatch">
                        <div className="img"></div>
                        <h4>Name / Color</h4>
                        <p>4 YDS</p>
                    </div>
                    <div className="SwatchesPage-Swatch">
                        <div className="img"></div>
                        <h4>Name / Color</h4>
                        <p>4 YDS</p>
                    </div>
                    <div className="SwatchesPage-Swatch">
                        <div className="img"></div>
                        <h4>Name / Color</h4>
                        <p>4 YDS</p>
                    </div>
                    <div className="SwatchesPage-Swatch">
                        <div className="img"></div>
                        <h4>Name / Color</h4>
                        <p>4 YDS</p>
                    </div>
                    <div className="SwatchesPage-Swatch">
                        <div className="img"></div>
                        <h4>Name / Color</h4>
                        <p>4 YDS</p>
                    </div>
                    <div className="SwatchesPage-Swatch">
                        <div className="img"></div>
                        <h4>Name / Color</h4>
                        <p>4 YDS</p>
                    </div>
                    <div className="SwatchesPage-Swatch">
                        <div className="img"></div>
                        <h4>Name / Color</h4>
                        <p>4 YDS</p>
                    </div>
                    <div className="SwatchesPage-Swatch">
                        <div className="img"></div>
                        <h4>Name / Color</h4>
                        <p>4 YDS</p>
                    </div>
                </div>
                <div className="SwatchesPage-Buttons">
                    <Link to='#' className="btn">DELETE</Link>
                </div>
            </div>
        </div>
    );
}

export default SwatchesPage;