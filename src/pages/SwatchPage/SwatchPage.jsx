import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './SwatchPage.css';
import NavBar from '../../components/NavBar/NavBar';
import swatchAPI from  '../../utils/swatchAPI';

class SwatchPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
          type: '',
          color: '',
          quantity: '',
          notes: '',
          image: ''
      }
  }

    componentDidMount() {
        var swatchid = this.props.match.params.swatch_id;
        var swatch = swatchAPI.show(swatchid).then((json) => {
            this.setState({
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
                        <h2 className="SwatchPage-Title">{this.state.color} {this.state.type}</h2>
                        <h4 className="SwatchPage-QTY">{this.state.quantity}</h4>
                    </div>
                </div>
                <div className="SwatchPage-Buttons">
                    <Link to='#' className="btn">EDIT</Link>
                    <Link to='#' className="btn">DELETE</Link>
                </div>
            </div>
        )
    }
}

export default SwatchPage;