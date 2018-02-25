// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema(
  {
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    regDate: { type: Date, default: Date.now },
    loginDate: { type: Date, default: Date.now },
    phone: Number,
    emailVerified: { type: Boolean, default: false }
  }
);

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;
