/**
 * Module dependencies.
 */
var OAuthTokensModel = require('./../models/oauthtokens');
var OAuthClientsModel = require('./../models/oauthclients');
var OAuthUsersModel = require('./../models/oauthusers');

const model = {

  getAccessToken: function(bearerToken) {
    return OAuthTokensModel.findOne({ accessToken: bearerToken }).lean();
  },

  getClient: function(clientId, clientSecret) {
    return OAuthClientsModel.findOne({ clientId: clientId, clientSecret: clientSecret }).lean();
  },

  getUser: function(email, password) {
    return OAuthUsersModel.findOne({ email: email, password: password }).lean();
  },

  saveToken: function(token, client, user) {

    var myDate = new Date();
    myDate.setDate(myDate.getDate() + 30);

    var accessToken = new OAuthTokensModel({
      accessToken: token.accessToken,
      accessTokenExpiresOn: myDate, //token.accessTokenExpiresOn,
      client : client,
      clientId: client.clientId,
      refreshToken: token.refreshToken,
      refreshTokenExpiresOn: token.refreshTokenExpiresOn,
      user : user,
      userId: user._id,
    });
    // Can't just chain `lean()` to `save()` as we did with `findOne()` elsewhere. Instead we use `Promise` to resolve the data.
    return new Promise( function(resolve,reject){
      accessToken.save(function(err,data){
        if( err ) reject( err );
        else resolve( data );
      }) ;
    }).then(function(saveResult){
      // `saveResult` is mongoose wrapper object, not doc itself. Calling `toJSON()` returns the doc.
      saveResult = saveResult && typeof saveResult == 'object' ? saveResult.toJSON() : saveResult;

      // Unsure what else points to `saveResult` in oauth2-server, making copy to be safe
      var data = new Object();
      for( var prop in saveResult ) data[prop] = saveResult[prop];

      // /oauth-server/lib/models/token-model.js complains if missing `client` and `user`. Creating missing properties.
      data.client = data.clientId;
      data.user = data.userId;

      return data;
    });
  }

};

module.exports = model;
