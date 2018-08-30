var mongoose = require('mongoose');
var Enums = require('../src/utils/enums');

var swatchSchema = new mongoose.Schema({
  image: {
    type: String, 
    required: true
  },
  type: {
    type: String, 
    enum: Enums.types, 
    required: true
  },
  color: {
    type: String,
    enum: Enums.colors, 
    required: true
  },
  quantity: {
    type: String,
    enum: Enums.quantities,
    required: true},
  notes: {type: String},
  user: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
  }, 
  {
  timestamps: true
});

module.exports = mongoose.model('Swatch', swatchSchema);