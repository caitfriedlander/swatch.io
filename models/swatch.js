var mongoose = require('mongoose');
var Enums = require('../src/utils/enums');

var swatchSchema = new mongoose.Schema({
  image: {type: String},
  type: {
    type: String, 
    enum: Enums.types, 
    required: true},
  color: {
    type: String,
    enum: Enums.colors, 
    required: true},
  quantity: {
    type: String,
    enum: Enums.quantities,
    required: true},
  notes: {type: String}
}, {
  timestamps: true
});

module.exports = mongoose.model('Swatch', swatchSchema);