
// OauthServer
const OAuth2Server       = require('oauth2-server');
const AccessDeniedError  = require('oauth2-server/lib/errors/access-denied-error');
const Request            = OAuth2Server.Request;
const Response           = OAuth2Server.Response;

// routes/note_routes.js
var OAuthUsersModel = require('./../models/oauthusers');


const oauth = new OAuth2Server({
  model: require('./../models/model.js'),
  grants: ['password'],
  debug: true
});


module.exports = function(app, db) {

  app.post('/api/login', (req, res) => {

    let response = new Response({
        headers: { }
    });

    let request = new Request({
        method: 'POST',
        query: {},
        headers: {},
        body: {
            client_id: 'LoanTrack',
            client_secret: '123',
            grant_type: 'password',
            username: req.body.username,
            password: req.body.password,
        }
    });

    let options = {
      requireClientAuthentication: { password: false },
      accessTokenLifetime: 3600
    };

    oauth.token(request, response, options)
      .then((token) => {
        // The resource owner granted the access request.
        res.send(token)
      })
      .catch((err) => {
        // The request was invalid or not authorized.
        console.log(err);
        res.send('User not registered!');
      });

  });

  app.post('/api/signup', (req, res) => {

      var newUser = OAuthUsersModel({
        email:  req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
        username: req.body.username
      });

      newUser.save(function(err, user) {
        if (err) {
            res.send('Error in registration!');
        }
        else
            res.send(user);
      });

  });

  app.post('/api/getUser', (req, res) => {

     let response = new Response({
            headers: { }
        });

    let request = new Request(req);

    oauth.authenticate(request, response)
      .then((token) => {

        OAuthUsersModel.find({
          username: req.body.username,
          password: req.body.password
        },function(err, user) {
          if (err) {
              res.send('No user found!');
          }
          else
              res.send(user);
        });

      })
      .catch((err) => {
        res.send('Invalid Token')
      });


  });

}
