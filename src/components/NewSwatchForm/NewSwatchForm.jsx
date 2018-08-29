import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import swatchAPI from '../../utils/swatchAPI';
import keys from '../../utils/.keys';
import Camera from 'react-html5-camera-photo';
import { uploadFile } from 'react-s3';
import 'react-html5-camera-photo/build/css/index.css';
import './NewSwatchForm.css';

const config = {
    bucketName: keys.BUCKET_NAME,
    region: 'us-west-1',
    accessKeyId: keys.ACCESS_KEY_ID,
    secretAccessKey: keys.SECRET_ACCESS_KEY
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
			ShowCamera: false
		};
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
    swatchAPI.create(this.state)
    .then(swatch => {
        this.props.handleCreateSwatch(swatch);
        this.props.history.push('/');
    });

  }

  isFormInvalid() {
    return (!this.state.type || this.state.type === null);
  }

  render() {
    return (
		<React.Fragment>
			{this.state.ShowCamera && 
			<Camera
				className="NewSwatchForm-Camera"
				idealResolution={{width: window.innerWidth, height: window.innerWidth }}
				onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
			/>
			}
			<div className="NewSwatchForm">
			<form className="NewSwatchForm-Form" onSubmit={this.handleSubmit} >
				<div className="NewSwatchForm-ImgGroup">
				<div className="NewSwatchForm-ImgBtn">
					<Link to="#"><img src="https://cdn0.iconfinder.com/data/icons/love-and-romance-1-5/24/7-512.png" className="NewSwatchForm-ShowCamera" onClick={this.handleCameraLaunch}/></Link>
					<h4>Upload an Image</h4>
				</div>
				<div className="NewSwatchForm-Preview">{this.state.image ? <img className="NewSwatchForm-PreviewImage" src={this.state.image}></img> : ''}</div>
				</div>
				<div className="NewSwatchForm-Group">
					<label>Type: </label>
					<select className="form-control" selected="selected" value={this.state.type} onChange={(e) => this.handleChange('type', e)} >
						<option value="null"></option>
						<option value="Acetate">Acetate</option>
						<option value="Acrylic">Acrylic</option>
						<option value="Alpaca">Alpaca</option>
						<option value="Angora">Angora</option>
						<option value="Antique Satin">Antique Satin</option>
						<option value="Aubusson">Aubusson</option>
						<option value="Bamboo Fabric">Bamboo Fabric</option>
						<option value="Bark Cloth">Bark Cloth</option>
						<option value="Basket Weave">Basket Weave</option>
						<option value="Batiste">Batiste</option>
						<option value="Bedford Cord">Bedford Cord</option>
						<option value="Bengaline">Bengaline</option>
						<option value="Boiled Wool">Boiled Wool</option>
						<option value="Boucle">Boucle</option>
						<option value="Broadcloth">Broadcloth</option>
						<option value="Brocade">Brocade</option>
						<option value="Brocatelle">Brocatelle</option>
						<option value="Burlap">Burlap</option>
						<option value="Burn Out Velvet">Burn Out Velvet</option>
						<option value="Custom">Custom</option>
						<option value="Calico ">Calico</option>
						<option value="Cambric">Cambric</option>
						<option value="Camel's Hair">Camel's Hair</option>
						<option value="Canvas">Canvas</option>
						<option value="Casement Cloth">Casement Cloth</option>
						<option value="Cashmere">Cashmere</option>
						<option value="Challis">Challis</option>
						<option value="Chambray">Chambray</option>
						<option value="Chantilly Lace">Chantilly Lace</option>
						<option value="Charmuese">Charmuese</option>
						<option value="Cheesecloth">Cheesecloth</option>
						<option value="Chenille">Chenille</option>
						<option value="Chiffon">Chiffon</option>
						<option value="Chintz">Chintz</option>
						<option value="Chite">Chite</option>
						<option value="Contemporary">Contemporary</option>
						<option value="Contract">Contract</option>
						<option value="Corduroy">Corduroy</option>
						<option value="Cotton">Cotton</option>
						<option value="Crepe">Crepe</option>
						<option value="Crepe Charmeuse">Crepe Charmeuse</option>
						<option value="Crepe de Chine">Crepe de Chine</option>
						<option value="Crepe-back Satin">Crepe-back Satin</option>
						<option value="Crewel">Crewel</option>
						<option value="Crocheted">Crocheted</option>
						<option value="Denim">Denim</option>
						<option value="Doeskin">Doeskin</option>
						<option value="Dotted Swiss">Dotted Swiss</option>
						<option value="Drill">Drill</option>
						<option value="Duck Cloth">Duck Cloth</option>
						<option value="Dupioni Silk">Dupioni Silk</option>
						<option value="Faille">Faille</option>
						<option value="Faux Fur">Faux Fur</option>
						<option value="Felt">Felt</option>
						<option value="Flannel">Flannel</option>
						<option value="Fleece">Fleece</option>
						<option value="Foulard">Foulard</option>
						<option value="Frieze">Frieze</option>
						<option value="Gabardine">Gabardine</option>
						<option value="Gauze">Gauze</option>
						<option value="Georgette">Georgette</option>
						<option value="Gimp">Gimp</option>
						<option value="Gingham">Gingham</option>
						<option value="Gossamer">Gossamer</option>
						<option value="Grois Point">Grois Point</option>
						<option value="Grosgrain">Grosgrain</option>
						<option value="Habutai">Habutai</option>
						<option value="Handmade">Handmade</option>
						<option value="Homespun">Homespun</option>
						<option value="Irish Poplin">Irish Poplin</option>
						<option value="Jacquard">Jacquard</option>
						<option value="Jersey">Jersey</option>
						<option value="Khaki">Khaki</option>
						<option value="Knit">Knit</option>
						<option value="La Coste">La Coste</option>
						<option value="Lace">Lace</option>
						<option value="Lame">Lame</option>
						<option value="Lawn">Lawn</option>
						<option value="Leather">Leather</option>
						<option value="Leatherette">Leatherette</option>
						<option value="Linen">Linen</option>
						<option value="Loden Cloth">Loden Cloth</option>
						<option value="Lycra">Lycra</option>
						<option value="Madras">Madras</option>
						<option value="Marabou">Marabou</option>
						<option value="Matelasse">Matelasse</option>
						<option value="Melton">Melton</option>
						<option value="Merino">Merino</option>
						<option value="Mesh">Mesh</option>
						<option value="Microfiber">Microfiber</option>
						<option value="Mohair">Mohair</option>
						<option value="Moiree">Moiree</option>
						<option value="Moleskin">Moleskin</option>
						<option value="Monk's Cloth">Monk's Cloth</option>
						<option value="Muslin">Muslin</option>
						<option value="Net">Net</option>
						<option value="Nylon">Nylon</option>
						<option value="Oilcloth">Oilcloth</option>
						<option value="Oilskin">Oilskin</option>
						<option value="Organdy">Organdy</option>
						<option value="Organza">Organza</option>
						<option value="Ottoman">Ottoman</option>
						<option value="Oxford Cotton">Oxford Cotton</option>
						<option value="Peau de Soie">Peau de Soie</option>
						<option value="Percale">Percale</option>
						<option value="Pique">Pique</option>
						<option value="Plisse">Plisse</option>
						<option value="Plush">Plush</option>
						<option value="Pointelle">Pointelle</option>
						<option value="Polyester">Polyester</option>
						<option value="Poplin">Poplin</option>
						<option value="Rayon">Rayon</option>
						<option value="Ripstop Nylon">Ripstop Nylon</option>
						<option value="Sateen">Sateen</option>
						<option value="Satin">Satin</option>
						<option value="Sequined">Sequined</option>
						<option value="Silk">Silk</option>
						<option value="Silk Shantung">Silk Shantung</option>
						<option value="Spandex">Spandex</option>
						<option value="Suede">Suede</option>
						<option value="Surah">Surah</option>
						<option value="Suzani">Suzani</option>
						<option value="Taffeta">Taffeta</option>
						<option value="Tapestry">Tapestry</option>
						<option value="Tarpaulin">Tarpaulin</option>
						<option value="Terry Cloth">Terry Cloth</option>
						<option value="Tweed">Tweed</option>
						<option value="Twill">Twill</option>
						<option value="Ultrasuede">Ultrasuede</option>
						<option value="Union Cloth">Union Cloth</option>
						<option value="Velour">Velour</option>
						<option value="Velvet">Velvet</option>
						<option value="Velveteen">Velveteen</option>
						<option value="Venice Lace">Venice Lace</option>
						<option value="Viscose">Viscose</option>
						<option value="Voile">Voile</option>
						<option value="Waffle Cloth">Waffle Cloth</option>
						<option value="Wool">Wool</option>
						<option value="Wool Crepe">Wool Crepe</option>
						<option value="Other">Other</option>
						<option value="Unknown">Unknown</option>
					</select>
				</div>
				<div className="NewSwatchForm-Group">
					<label>Color: </label>
					<select className="form-control" selected="selected" value={this.state.color} onChange={(e) => this.handleChange('color', e)} >
						<option value="null"></option>
						<option value="White">White</option>
						<option value="Silver">Silver</option>
						<option value="Gray">Gray</option>
						<option value="Blue">Blue</option>
						<option value="Green">Green</option>
						<option value="Orange">Orange</option>
						<option value="Pink">Pink</option>
						<option value="Red">Red</option>
						<option value="Purple">Purple</option>
						<option value="Brown">Brown</option>
						<option value="Yellow">Yellow</option>
						<option value="Black">Black</option>
						<option value="Beige">Beige</option>
						<option value="Gold">Gold</option>
						<option value="Multiple">Multiple</option>
						<option value="Other">Other</option>
					</select>
				</div>
				<div className="NewSwatchForm-Group">
					{/* <input type="text" className="form-control" placeholder="Quantity" value={this.state.quantity} onChange={(e) => this.handleChange('quantity', e)} /> */}
					<label>Qunatity: </label>
					<select className="form-control" selected="selected" value={this.state.quantity} onChange={(e) => this.handleChange('quantity', e)} >
						<option value="null"></option>
						<option value="1 YD">1 YD</option>
						<option value="2 YDS">2 YDS</option>
						<option value="3 YDS">3 YDS</option>
						<option value="4 YDS">4 YDS</option>
						<option value="5 YDS">5 YDS</option>
						<option value="6 YDS">6 YDS</option>
						<option value="7 YDS">7 YDS</option>
						<option value="8 YDS">8 YDS</option>
						<option value="9 YDS">9 YDS</option>
						<option value="10 YDS">10 YDS</option>
						<option value="11 YDS">11 YDS</option>
						<option value="12 YDS">12 YDS</option>
						<option value="Bolt">Whole Bolt</option>
						<option value="Hide">Hide</option>
						<option value="Scrap">Scrap</option>
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
		</React.Fragment>
    );
  }
};

export default NewSwatchForm;
