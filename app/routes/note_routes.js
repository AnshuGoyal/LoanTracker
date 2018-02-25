// routes/note_routes.js
var User = require('./../models/user');

module.exports = function(app, db) {

  app.post('/api/signup', (req, res) => {

    var newUser = new User({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
    });

    newUser.save(function(err) {
      if (err) {
        res.send('Sorry, User already present');
      }
      else
      res.send({ status: 200, message: 'Registration Successfully' });
    });

  });

  app.post('/api/login', (req, res) => {

    User.find(
      {
        username: req.body.username,
        password: req.body.password
      },
      function(err, user) {
        if (err) {
          res.send('User not registered!');
        }
        else
        res.send(user);
      }
    );

  });

}
