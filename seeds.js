require('dotenv').config();
require('./config/database');
var User = require('./models/user');

Promise.all([
  User.remove({}).exec(),
]).then(() => {
  User.create({name: 'cait', email: 'c@e.com', password: 'abc'}).then(user => {
    user.save().then(() => {
      process.exit();
    });
  });
});
