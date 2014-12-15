/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors'),
      weather =  require('./components/weather');

module.exports = function(app) {
  weather.setupJobs();
  // Insert routes below
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
