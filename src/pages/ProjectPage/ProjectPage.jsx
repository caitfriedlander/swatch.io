import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './ProjectPage.css';
import NavBar from '../../components/NavBar/NavBar';
import projectAPI from '../../utils/projectAPI';

class ProjectPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
            id: '',
            name: '',
            swatches: []
        }
    }

    handleDelete = () => {
        console.log(this.props)
        projectAPI.delete(this.state.id)
        .then(() => {
            this.props.handleDeleteProject(this.state.id);
            this.props.history.push('/');
        });
    }

  componentDidMount() {
      var projectid = this.props.match.params.project_id;
      projectAPI.show(projectid).then((json) => {
          this.setState({
              id: json._id,
              name: json.name,
              swatches: json.swatches
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
                    { this.state.swatches.map(s => {
                            return <div className="ProjectPage-Swatch">
                                <Link to={`/swatches/${s._id}`} key={s._id}>
                                    {s.image ? <img className="img" alt="preview" src={s.image}></img> : <img className="img" alt="preview" src="https://i.imgur.com/FEPUuCj.png"></img>}
                                    <h4>{s.type} {s.color}</h4>
                                    <p>{s.quantity}</p>
                                </Link>
                            </div>
                        })
                    }
                </div>
                <div className="ProjectPage-Buttons">
                    <Link to='/' className="btn btn-delete" onClick={this.handleDelete}>DELETE</Link>
                </div>
            </div>
        )
    }
}

export default ProjectPage;