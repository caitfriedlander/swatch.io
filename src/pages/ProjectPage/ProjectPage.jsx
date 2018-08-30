import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './ProjectPage.css';
import NavBar from '../../components/NavBar/NavBar';
import projectAPI from '../../utils/projectAPI';

class ProjectPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        swatches: []
    }
}

  componentDidMount() {
      var projectid = this.props.match.params.project_id;
      projectAPI.show(projectid).then((json) => {
          this.setState({
              name: json.name,
              swatches: [json.swatches]
          })
      })
  }
    
    render() {
        return (
            <div className="ProjectPage">
                <NavBar 
                    user={this.props.user}
                    handleLogout={this.props.handleLogout}
                />
                <div className="ProjectPage-Header">
                    <h2 className="ProjectPage-Name">{this.state.name}</h2>
                    <h3 className="ProjectPage-Count">{this.state.swatches.length === 1 ? `(1) Swatch` : `(${this.state.swatches.length}) Swatches`}</h3>
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