require('dotenv').config();
require('./config/database');
var User = require('./models/user');
var Project = require('./models/project');

Promise.all([
  User.remove({}).exec(),
  Project.remove({}).exec()
]).then(() => {
  Project.create({name: 'test'}).then(project => {
    var user = new User({name: 'cait', email: 'cait@email.com', password: 'abc123'});
    user.projects.push(project._id);
    user.save().then(() => {
      process.exit();
    });
  });
});
