
//controllers
const apiLogin = require('./../controllers/apiLogin');
const apiSignup = require('./../controllers/apiSignup');
const apiUsers = require('./../controllers/apiUsers');
const apiSingleUser = require('./../controllers/apiSingleUser');

const beneficiary = require('../controllers/beneficiary.controller.js');
const transaction = require('../controllers/transection.controller.js');
const userNotification = require('../controllers/userNotification.controller.js');
const promotionalNotification = require('../controllers/promotionalNotification.controller.js');


module.exports = function(app) {

  app.post('/api/login', apiLogin);
  app.post('/api/signup', apiSignup);
  app.get('/api/users', apiUsers);
  app.get('/api/user/:userId', apiSingleUser);

  // Create a new Beneficiary
  app.post('/beneficiary', beneficiary.create);

  // Retrieve all Beneficiary
  app.get('/beneficiary', beneficiary.findAll);

  // Retrieve a single Beneficiary with BeneficiaryID
  app.get('/beneficiary/:beneficiaryId', beneficiary.findOne);

  // Retrieve a single Beneficiary with UID
  app.get('/beneficiaryuid/:UID', beneficiary.findSome);

  // Update a Beneficiary with BeneficiaryId
  app.put('/beneficiary/:beneficiaryId', beneficiary.update);

  // Delete a Beneficiary with BeneficiaryID
  app.delete('/beneficiary/:beneficiaryId', beneficiary.delete);

  // Create a new transaction
  app.post('/transaction', transaction.create);

  // Retrieve all transaction
  app.get('/transaction', transaction.findAll);

  // Retrieve a single transaction with transactionID
  app.get('/transaction/:transactionId', transaction.findOne);

  // Retrieve a single transaction with UID
  app.get('/transactionuid/:UID', transaction.findSome);

  // Update a transaction with transactionID
  app.put('/transaction/:transactionId', transaction.update);

  // Delete a transaction with transactionID
  app.delete('/transaction/:transactionId', transaction.delete);

  // Create a new UserNotification
  app.post('/userNotification', userNotification.create);

  // Retrieve all UserNotification
  app.get('/userNotification', userNotification.findAll);

  // Retrieve a single UserNotification with UserNotificationID
  app.get('/userNotification/:userNotificationId', userNotification.findOne);

  // Retrieve a single UserNotification with UID
  app.get('/userNotificationuid/:UID', userNotification.findSome);

  // Update a UserNotification with UserNotificationID
  app.put('/userNotification/:userNotificationId', userNotification.update);

  // Delete a UserNotification with UserNotificationID
  app.delete('/userNotification/:userNotificationId', userNotification.delete);

  // Create a new PromotionalNotification
  app.post('/promotionalNotification', promotionalNotification.create);

  // Retrieve all PromotionalNotification
  app.get('/promotionalNotification', promotionalNotification.findAll);

  // Retrieve a single PromotionalNotification with PromotionalNotificationID
  app.get('/promotionalNotification/:promotionalNotificationId', promotionalNotification.findOne);

  // Retrieve a single PromotionalNotification with UID
  app.get('/promotionalNotificationuid/:UID', promotionalNotification.findSome);

  // Update a PromotionalNotification with PromotionalNotificationID
  app.put('/promotionalNotification/:promotionalNotificationId', promotionalNotification.update);

  // Delete a PromotionalNotification with PromotionalNotificationID
  app.delete('/promotionalNotification/:promotionalNotificationId', promotionalNotification.delete);


}
