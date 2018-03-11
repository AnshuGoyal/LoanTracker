/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Schema definitions.
 */

mongoose.model('OAuthClients', new Schema({
  clientId: { type: String },
  clientSecret: { type: String },
  redirectUris: { type: Array }
}));


var OAuthClientsModel = mongoose.model('OAuthClients');
module.exports = OAuthClientsModel;