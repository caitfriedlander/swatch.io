var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
  name: {type: String, required: true},
  swatches: {type: mongoose.Schema.Types.ObjectId, ref: 'Swatch'}
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);