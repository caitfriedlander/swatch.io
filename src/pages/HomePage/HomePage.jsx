import React from 'react';
import {Link} from 'react-router-dom';
import './HomePage.css';
import NavBar from '../../components/NavBar/NavBar';
class HomePage extends React.Component {

    ComponentDidMount(props) {
        // this.props.loadProjects();
        // this.props.loadSwatches();
        // this.setState({swatches: this.props.swatches, projects: this.props.projects})
    }
    render() {
        return(
            <div className="HomePage">
                <NavBar 
                    user={this.props.user}
                    handleLogout={this.props.handleLogout}
                />
                <h2 className="HomePage-BigText">SWATCHES <span>({this.props.swatches.length})</span></h2>
                <div className="HomePage-Swatches">
                    {this.props.swatches.slice(0, 6).map(s => (
                        <div key={s._id}>
                            <Link to={`/swatches/${s._id}`}>
                                <div className="HomePage-Swatch">
                                    {s.image ? <img className="img" src={s.image}></img> : ''}
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="HomePage-Buttons">
                    <Link to='/swatches' className="btn">SEE ALL</Link>
                </div>
                <hr />
                <h2 className="HomePage-BigText">PROJECTS <span>({this.props.projects.length})</span></h2>
                <div className="HomePage-Buttons">
                    <Link to='/projects/new' className="NewProject-btn">NEW PROJECT</Link>
                    {this.props.projects.map(p => (
                        <div key={p._id}>
                            <Link to={`/projects/${p._id}`} className="Project-btn">{p.name}</Link>
                        </div>
                    ))}
                </div>
            </div>
    )}
}

export default HomePage;