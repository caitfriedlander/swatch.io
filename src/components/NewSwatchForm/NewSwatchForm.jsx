import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import swatchAPI from '../../utils/swatchAPI';
import Camera, {FACING_MODES} from 'react-html5-camera-photo';
import { uploadFile } from '../../lib/ReactS3';
import 'react-html5-camera-photo/build/css/index.css';
import './NewSwatchForm.css';

var config = {
	region: 'us-west-1'
}

class NewSwatchForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: '',
			color: '',
			quantity: '',
			notes: '',
			image: null,
			ShowCamera: false,
			colors: [],
			types: [],
			quantities: []
		};
	}

	componentDidMount() {
		swatchAPI.swatch().then(data => {
			Object.assign(config, data)
		});
		swatchAPI.info().then(info => {
			this.setState({
				colors: info.colors,
				types: info.types,
				quantities: info.quantities	
			})
		});
	}

	handleChange = (field, e) => {
		this.props.updateMessage('');
		this.setState({
		[field]: e.target.value
		});
	}

	handleCameraLaunch = () => {
		this.setState({
			ShowCamera: true
		})
	}

	onTakePhoto (dataUri) {
		var blob = this.dataURItoBlob(dataUri);
		var file = this.blobToFile(blob);
		uploadFile(file, config)
		.then((data) => {
			console.log(data.location)
			this.setState({
				ShowCamera: false,
				image: data.location
			})
		})
		.catch((err) => {
			console.log(err);
		})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		if (this.state.color === '' || this.state.type === '' || this.state.quantity === '') {
			alert('Please fill out Color, Quantity, type and incluide an image.');
			return; 
		}
		swatchAPI.create(this.state)
		.then(swatch => {
			this.props.handleCreateSwatch(swatch);
			this.props.history.push('/');
		});

	}

	dataURItoBlob (dataURI) {
		// convert base64 to raw binary data held in a string
		var byteString = atob(dataURI.split(',')[1]);
		// separate out the mime component
		var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
		// write the bytes of the string to an ArrayBuffer
		var arrayBuffer = new ArrayBuffer(byteString.length);
		var _ia = new Uint8Array(arrayBuffer);
		for (var i = 0; i < byteString.length; i++) {
			_ia[i] = byteString.charCodeAt(i);
		}
		var dataView = new DataView(arrayBuffer);
		var blob = new Blob([dataView], { type: mimeString });
		return blob;
	}

	blobToFile (blob) {
		var filename = `${Date.now()}.png`;
		var file = new File([blob], filename, {type: 'image/png', lastModified: Date.now()});
		return file;
	}

	isFormInvalid() {
		return (!this.state.type || this.state.type === null);
	}

	render() {
		return (
			<React.Fragment>
				{this.state.ShowCamera ?  
					<div className="NewSwatchForm-CameraBox">
						<Camera
							className="NewSwatchForm-Camera"
							onCameraError={(error) => {alert(error)}}
							idealFacingMode={FACING_MODES.ENVIRONMENT}
							idealResolution={{width: 400, height: 400}}
							onTakePhoto={ (dataUri) => { this.onTakePhoto(dataUri); } }
						/>
					</div>
					:
					<div className="NewSwatchForm">
					<form className="NewSwatchForm-Form" onSubmit={this.handleSubmit} >
						<div className="NewSwatchForm-ImgGroup">
						<div className="NewSwatchForm-ImgBtn">
							<Link to="#"><img src="https://cdn0.iconfinder.com/data/icons/love-and-romance-1-5/24/7-512.png" alt="camera" className="NewSwatchForm-ShowCamera" onClick={this.handleCameraLaunch}/></Link>
							<h4>Upload an Image</h4>
						</div>
						<div className="NewSwatchForm-Preview">{this.state.image ? <img className="NewSwatchForm-PreviewImage" alt="preview" src={this.state.image}></img> : <img className="NewSwatchForm-PreviewImage" alt="preview" src="https://i.imgur.com/FEPUuCj.png"></img>}</div>
						</div>
						<div className="NewSwatchForm-Group">
							<label>Type: </label>
							<select className="form-control" selected="selected" value={this.state.type} onChange={(e) => this.handleChange('type', e)} required>
								<option value="null"></option>
								{this.state.types.map(t => (
									<option key={t} value={t}>{t}</option>
								))}
							</select>
						</div>
						<div className="NewSwatchForm-Group">
							<label>Color: </label>
							<select className="form-control" selected="selected" value={this.state.color} onChange={(e) => this.handleChange('color', e)} required>
								<option value="null"></option>
								{this.state.colors.map(c => (
									<option key={c} value={c}>{c}</option>
								))}
							</select>
						</div>
						<div className="NewSwatchForm-Group">
							<label>Qunatity: </label>
							<select className="form-control" selected="selected" value={this.state.quantity} onChange={(e) => this.handleChange('quantity', e)} required>
								<option value="null"></option>
								{this.state.quantities.map(q => (
									<option key={q} value={q}>{q}</option>
								))}
							</select>
						</div>
						<div className="NewSwatchForm-Group">
							<input type="text" className="form-control" placeholder="Notes" value={this.state.notes} onChange={(e) => this.handleChange('notes', e)} />
						</div>
						<div className="NewSwatchForm-Group">
							<div className="NewSwatchForm-Buttons">
								<button type="submit" className="btn default" disabled={this.isFormInvalid()}>CREATE SWATCH</button>
								<Link to='/' className="btn cancel">CANCEL</Link>
							</div>
						</div>
					</form>
				</div>
				}
			</React.Fragment>
		);
	}
};

export default NewSwatchForm;
