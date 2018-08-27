var mongoose = require('mongoose');

var swatchSchema = new mongoose.Schema({
  type: {type: String, required: true},
  color: {type: String, required: true},
  quantity: {type: String, required: true},
  notes: {type: String, required: true}
}, {
  timestamps: true
});

module.exports = mongoose.model('Swatch', swatchSchema);