/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Schema definitions.
 */

mongoose.model('OAuthUsers', new Schema({
  email:    { type: String, required: true  },
  firstname:{ type: String, required: true },
  lastname: { type: String },
  password: { type: String, required: true  },
  username: { type: String, required: true  }
}));


var OAuthUsersModel = mongoose.model('OAuthUsers');
module.exports = OAuthUsersModel;