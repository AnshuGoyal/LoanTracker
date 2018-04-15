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
  name:     { type: String, required: true },
  password: { type: String, required: true  },
  mobile:   { type: String },
  isEmailVerified: { type: Boolean, default: false },
  isPhoneVerified: { type: Boolean, default: false },
  additionalDetails: { type: String }
}, {
    timestamps: true
}));


var OAuthUsersModel = mongoose.model('OAuthUsers');
module.exports = OAuthUsersModel;
