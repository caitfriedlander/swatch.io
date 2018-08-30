import React from 'react';
import {Link} from 'react-router-dom';
import './SwatchesPage.css';
import NavBar from '../../components/NavBar/NavBar';

class SwatchesPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <NavBar 
                    user={this.props.user}
                    handleLogout={this.props.handleLogout}
                />
                <div className="SwatchesPage">    
                    <div className="SwatchesPage-DDs">
                        <Link to='#' className="dd">COLOR</Link>
                        <Link to='#' className="dd">TYPE</Link>
                    </div>
                    <div className="SwatchesPage-Swatches">
                        {this.props.swatches.map(s => (
                            <Link to={`/swatches/${s._id}`} key={s._id}>
                                <div className="SwatchesPage-Swatch">
                                    {s.image ? <img className="img" src={s.image}></img> : ''}
                                    <div className="SwatchesPage-TextBox">
                                        <h4>{s.color.toUpperCase()} {s.type.toUpperCase()}</h4>
                                        <p>{s.quantity}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default SwatchesPage;