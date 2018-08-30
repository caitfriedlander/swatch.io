var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
  name: {type: String, required: true},
  swatches: [{type: mongoose.Schema.Types.ObjectId, ref: 'Swatch'}],
  user: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);