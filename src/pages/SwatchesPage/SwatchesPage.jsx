import React from 'react';
import {Link} from 'react-router-dom';
import './SwatchesPage.css';
import NavBar from '../../components/NavBar/NavBar';
import swatchAPI from '../../utils/swatchAPI';

class SwatchesPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            colors: [],
			types: []
        }
    }

    updateMessage = (msg) => {
        this.setState({message: msg});
    }

    componentDidMount () {
        swatchAPI.info().then(info => {
			this.setState({
				colors: info.colors,
				types: info.types,
				quantities: info.quantities	
            });
        });
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
                            <div>
                                <label>Color: </label>
                                <select className="form-control" selected="selected" value={this.props.filterColor} onChange={(e) => this.props.handleSetFilter('filterColor', e.target.value)} required>
                                    <option value="">All</option>
                                    {this.state.colors.map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>
                            <div >
                                <label>Type: </label>
                                <select className="form-control" selected="selected" value={this.props.filterType} onChange={(e) => this.props.handleSetFilter('filterType', e.target.value)} required>
                                    <option value="">All</option>
                                    {this.state.types.map(t => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                            </div>
                    </div>
                    <div className="SwatchesPage-Swatches">
                        {this.props.swatches.map(s => (
                            <Link to={`/swatches/${s._id}`} key={s._id}>
                                <div className="SwatchesPage-Swatch">
                                    {s.image ? <img className="img" alt="preview" src={s.image}></img> : ''}
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