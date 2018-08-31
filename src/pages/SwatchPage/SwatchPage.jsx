import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './SwatchPage.css';
import NavBar from '../../components/NavBar/NavBar';
import swatchAPI from  '../../utils/swatchAPI';
import projectAPI from  '../../utils/projectAPI';

class SwatchPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
          id: '',
          type: '',
          color: '',
          quantity: '',
          notes: '',
          image: '',
          message: '',
          projectId: '',
          project: null
      }
    }

	handleChange = (field, e) => {
		this.setState({
		[field]: e.target.value
		});
	}
    
    handleAddToProject = (e) => {
        e.preventDefault();
        projectAPI.addSwatch(this.state.projectId, this.state.id)
        .then(project => this.setState({project}));
    }

    handleDelete = () => {
        swatchAPI.delete(this.state.id, this.state.project && this.state.project._id)
		.then(() => {
            this.props.handleDeleteSwatch(this.state.id);
			this.props.history.push('/');
		});
    }

    componentDidMount() {
        var swatchid = this.props.match.params.swatch_id;
        swatchAPI.show(swatchid).then((json) => {
            this.setState({
                id: json._id,
                type: json.type,
                color: json.color,
                quantity: json.quantity,
                notes: json.notes,
                image: json.image
            });
        });
    }
    
    render() {
        var projects = this.props.projects;
        var project = (projects ? projects.find(p => p.swatches.includes(this.state.id)) : null) || this.state.project;
        return (
            <div className="SwatchPage">
                <NavBar 
                    user={this.props.user}
                    handleLogout={this.props.handleLogout}
                />
                <div className="SwatchPage-Header">
                    <div className="SwatchPage-Preview">
                        {this.state.image ? <img className="img" alt="preview" src={this.state.image}></img> : <img className="img" alt="preview" src="https://i.imgur.com/FEPUuCj_d.jpg"></img>}
                    </div>
                    <div className="SwatchPage-HeaderText">
                        <h1 className="SwatchPage-Title">{this.state.color.toUpperCase()} {this.state.type.toUpperCase()}</h1>
                        <h4 className="SwatchPage-QTY">{this.state.quantity}</h4>
                    </div>
                </div>
                <div className="SwatchPage-ProjectsList">
                    <div className="SwatchPage-Notes">
                            <h2>NOTES</h2>
                            <p>{this.state.notes}</p>
                    </div>
                    {  project ? 
                    <div className="SwatchPage-Notes Second">
                        <h2>PROJECT: {project.name}</h2> 
                    </div>
                    :
                    <form className="SwatchPage-Form" onSubmit={(e) => this.handleAddToProject(e)}>
                        <div className="SwatchPage-Group">
                            <h2>ADD TO PROJECT</h2>
                            <select className="form-control" selected="selected" value={this.state.projectId} onChange={(e) => this.handleChange('projectId', e)} >
                                <option value="null"></option>
                                {projects.map(p => (
                                    <option key={p._id} value={p._id}>{p.name}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-add" disabled={!this.state.projectId} >ADD</button>
                    </form>}
                </div>
                <div className="SwatchPage-Buttons">
                    <Link to={`/swatches/${this.state.id}/edit`} className="btn btn-edit">EDIT</Link>
                    <Link to='/' className="btn btn-delete" onClick={this.handleDelete}>DELETE</Link>
                </div>
            </div>
        )
    }
}

export default SwatchPage;