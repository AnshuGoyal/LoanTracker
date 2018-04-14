
//controllers
var apiLogin = require('./../controllers/apiLogin');
var apiSignup = require('./../controllers/apiSignup');
var apiUsers = require('./../controllers/apiUsers');
var apiSingleUser = require('./../controllers/apiSingleUser');

module.exports = function(app, db) {

  app.post('/api/login', apiLogin);
  app.post('/api/signup', apiSignup);
  app.post('/api/users', apiUsers);
  app.get('/api/user/:userId', apiSingleUser);

}
