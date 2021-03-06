import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import swatchAPI from '../../utils/swatchAPI';
import Camera from 'react-html5-camera-photo';
import { uploadFile } from '../../lib/ReactS3';
import 'react-html5-camera-photo/build/css/index.css';
import './EditSwatchForm.css';

var config = {
	region: 'us-west-1'
}

class EditSwatchForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
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

	handleUpdate = (e) => {
        e.preventDefault();
        swatchAPI.addSwatch(this.state.swatchId, this.state.id)
        .then(swatch => this.setState({swatch}));
        this.props.history.push('/');
    }

	componentDidMount() {
		var swatchid = this.props.match.params.swatch_id;
		swatchAPI.swatch().then(data => {
			Object.assign(config, data)
		});
		swatchAPI.info().then(info => {
			this.setState({
				colors: info.colors,
				types: info.types,
				quantities: info.quantities	
			})
		}).then(() => {
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
		delete this.state.colors;
		delete this.state.types;
		delete this.state.quantities;
		delete this.state.ShowCamera;
		swatchAPI.update(this.state)
		.then(swatch => {
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
					<div className="EditSwatchForm-CameraBox">
						<Camera
							className="EditSwatchForm-Camera"
							idealResolution={{width: window.innerWidth, height: window.innerWidth }}
							onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
						/>
					</div>
				:
					<div className="EditSwatchForm">
					<form className="EditSwatchForm-Form" onSubmit={this.handleSubmit} >
						<div className="EditSwatchForm-ImgGroup">
						<div className="EditSwatchForm-ImgBtn">
							<Link to="#"><img src="https://cdn0.iconfinder.com/data/icons/love-and-romance-1-5/24/7-512.png" alt="camera" className="EditSwatchForm-ShowCamera" onClick={this.handleCameraLaunch}/></Link>
							<h4>Upload an Image</h4>
						</div>
						<div className="EditSwatchForm-Preview">{this.state.image ? <img className="EditSwatchForm-PreviewImage" alt="preview" src={this.state.image}></img> : <img className="EditSwatchForm-PreviewImage" alt="preview" src="https://i.imgur.com/FEPUuCj.png"></img>}</div>
						</div>
						<div className="EditSwatchForm-Group">
							<label>Type: </label>
							<select className="form-control" selected="selected" value={this.state.type} onChange={(e) => this.handleChange('type', e)} >
								<option value="null"></option>
								{this.state.types.map(t => (
									<option key={t} value={t}>{t}</option>
								))}
							</select>
						</div>
						<div className="EditSwatchForm-Group">
							<label>Color: </label>
							<select className="form-control" selected="selected" value={this.state.color} onChange={(e) => this.handleChange('color', e)} >
								<option value="null"></option>
								{this.state.colors.map(c => (
									<option key={c} value={c}>{c}</option>
								))}
							</select>
						</div>
						<div className="EditSwatchForm-Group">
							{/* <input type="text" className="form-control" placeholder="Quantity" value={this.state.quantity} onChange={(e) => this.handleChange('quantity', e)} /> */}
							<label>Qunatity: </label>
							<select className="form-control" selected="selected" value={this.state.quantity} onChange={(e) => this.handleChange('quantity', e)} >
								<option value="null"></option>
								{this.state.quantities.map(q => (
									<option key={q} value={q}>{q}</option>
								))}
							</select>
						</div>
						<div className="EditSwatchForm-Group">
							<input type="text" className="form-control" placeholder="Notes" value={this.state.notes} onChange={(e) => this.handleChange('notes', e)} />
						</div>
						<div className="EditSwatchForm-Group">
							<div className="EditSwatchForm-Buttons">
								<button type="submit" className="btn default" disabled={this.isFormInvalid()}>SAVE SWATCH</button>
								<Link to={`/swatches/${this.state.id}`} className="btn cancel">CANCEL</Link>
							</div>
						</div>
					</form>
				</div>
				}
			</React.Fragment>
		);
	}
};

export default EditSwatchForm;
