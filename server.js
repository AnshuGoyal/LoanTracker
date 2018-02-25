// server.js
const express            = require('express');
const mongoose           = require('mongoose');
const bodyParser         = require('body-parser');
const db                 = require('./config/db');
const app                = express();

// OauthServer
const OAuth2Server       = require('oauth2-server');
const AccessDeniedError  = require('oauth2-server/lib/errors/access-denied-error');
const Request            = OAuth2Server.Request;
const Response           = OAuth2Server.Response;

const oauth = new OAuth2Server({
  model: require('./app/models/model.js'),
  grants: ['password'],
  debug: true
});

const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// MongoDB Connection using mongoose
mongoose.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  require('./app/routes')(app, database);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
})


//    let request = new Request({
//        method: 'POST',
//        query: {},
//        headers: {
//           Authorization: 'Bearer ﻿422e5d1867c2f6ca6134f9553b4b339fda98f9ff'
//        }
//    });




