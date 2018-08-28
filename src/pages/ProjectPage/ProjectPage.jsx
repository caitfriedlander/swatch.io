import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './ProjectPage.css';
import NavBar from '../../components/NavBar/NavBar';

class ProjectPage extends Component {
    constructor(props) {
      super(props);
      // this.state = {
      //     project: {
      //         name: '',
      //         swatches: []
      //     }
      // };
    }

    componentDidMount() {
        console.log(`ProjectPage: ${this.props}`)
    }
    
    render() {
        return (
            <div className="ProjectPage">
                <NavBar 
                    user={this.props.user}
                    handleLogout={this.props.handleLogout}
                />
                <div className="ProjectPage-Header">
                    <h2 className="ProjectPage-Name">Project Name</h2>
                    <h3 className="ProjectPage-Count">(6) Swatches</h3>
                </div>
                <div className="ProjectPage-Swatches">
                    <div className="ProjectPage-Swatch">
                        <div className="img"></div>
                        <h4>Name / Color</h4>
                        <p>4 YDS</p>
                    </div>
                    <div className="ProjectPage-Swatch">
                        <div className="img"></div>
                        <h4>Name / Color</h4>
                        <p>4 YDS</p>
                    </div>
                    <div className="ProjectPage-Swatch">
                        <div className="img"></div>
                        <h4>Name / Color</h4>
                        <p>4 YDS</p>
                    </div>
                    <div className="ProjectPage-Swatch">
                        <div className="img"></div>
                        <h4>Name / Color</h4>
                        <p>4 YDS</p>
                    </div>
                    <div className="ProjectPage-Swatch">
                        <div className="img"></div>
                        <h4>Name / Color</h4>
                        <p>4 YDS</p>
                    </div>
                    <div className="ProjectPage-Swatch">
                        <div className="img"></div>
                        <h4>Name / Color</h4>
                        <p>4 YDS</p>
                    </div>
                </div>
                <div className="ProjectPage-Buttons">
                    <Link to='#' className="btn">DELETE</Link>
                </div>
            </div>
        )
    }
}

export default ProjectPage;