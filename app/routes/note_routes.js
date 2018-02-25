// routes/note_routes.js
var User = require('./../models/user');


module.exports = function(app, db) {

  app.post('/register', (req, res) => {

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
      res.send('User registered successfully!');
    });

  });

}
