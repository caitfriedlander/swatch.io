import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './SwatchPage.css';
import NavBar from '../../components/NavBar/NavBar';
import swatchAPI from  '../../utils/swatchAPI';

class SwatchPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
          id: '',
          type: '',
          color: '',
          quantity: '',
          notes: '',
          image: ''
      }
  }
    
    handleDelete = (e) => {
        e.preventDefault();
        console.log(this.state)
        swatchAPI.delete(this.state.id)
		.then(swatch => {
			this.props.history.push('/');
		});
    }

    componentDidMount() {
        var swatchid = this.props.match.params.swatch_id;
        swatchAPI.show(swatchid).then((json) => {
            console.log(this.props.projects);
            this.setState({
                id: json._id,
                type: json.type,
                color: json.color,
                quantity: json.quantity,
                notes: json.notes,
                image: json.image
            })
        })
    }
    
    render() {
        return (
            <div className="SwatchPage">
                <NavBar 
                    user={this.props.user}
                    handleLogout={this.props.handleLogout}
                />
                <div className="SwatchPage-Header">
                    <div className="SwatchPage-Preview"></div>
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
                    <form className="SwatchPage-Form">
                        <div className="SwatchPage-Group">
                            <h2>ADD TO PROJECT</h2>
                            <select className="form-control" selected="selected" value={this.state.color} onChange={(e) => this.handleChange('color', e)} >
                                <option value="null"></option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-add" >ADD</button>
                    </form>
                </div>
                <div className="SwatchPage-Buttons">
                    <Link to='#' className="btn btn-edit">EDIT</Link>
                    <Link to='/' className="btn btn-delete" onClick={this.handleDelete}>DELETE</Link>
                </div>
            </div>
        )
    }
}

export default SwatchPage;