var mongoose = require('mongoose');

var swatchSchema = new mongoose.Schema({
  image: {type: String},
  type: {type: String, required: true},
  color: {type: String, required: true},
  quantity: {type: String, required: true},
  notes: {type: String}
}, {
  timestamps: true
});

module.exports = mongoose.model('Swatch', swatchSchema);