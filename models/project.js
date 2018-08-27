var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
  name: {type: String, required: true},
  swatches: {type: String}
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);