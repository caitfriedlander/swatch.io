var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

require('dotenv').config();
require('./config/database');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Configure both serve-favicon & static middlewares
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
// Mount our custom auth middleware
app.use(require('./config/auth'));
app.use('/api/projects', require('./routes/api/projects'));
app.use('/api/swatches', require('./routes/api/swatches'));
// The following "catch all" route is necessary for
// a SPA's client-side routing to properly work
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
var port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});