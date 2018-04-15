const { Beneficiary, Transaction, UserNotification, PromotionalNotification } = require('../models/loan.model.js');
// Create and Save a new PromotionalNotification
exports.create = (req, res) => {
    // Validate request
    if(!req.body.Heading) {
        return res.status(400).send({
            message: "Heading can not be empty"
        });
    }
    else if(!req.body.Content) {
        return res.status(400).send({
            message: "Content can not be empty"
        });
    }

    // Create a PromotionalNotification
    const promotionalNotification = new PromotionalNotification({
        SenderID:  req.body.SenderID || "Admin",
        toWhom:  req.body.toWhom || "All Users",
        Heading:  req.body.Heading,
        Content:  req.body.Content,
        extraInfo: req.body.extraInfo || "Nill"
    });

    // Save PromotionalNotification in the database
    promotionalNotification.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the PromotionalNotification."
        });
    });
};

// Retrieve and return all PromotionalNotification from the database.
exports.findAll = (req, res) => {
    PromotionalNotification.find()
    .then(promotionalNotification => {
        res.send(promotionalNotification);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving PromotionalNotification."
        });
    });
};

// Find a single PromotionalNotification with a PromotionalNotificationId
exports.findOne = (req, res) => {
    PromotionalNotification.findById(req.params.promotionalNotificationId)
    .then(promotionalNotification => {
        if(!promotionalNotification) {
            return res.status(404).send({
                message: "PromotionalNotification not found with id " + req.params.promotionalNotificationId
            });            
        }
        res.send(promotionalNotification);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "PromotionalNotification not found with promotionalNotificationId " + req.params.promotionalNotificationId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving PromotionalNotification with promotionalNotificationId " + req.params.promotionalNotificationId
        });
    });
};

// Find a single PromotionalNotification with an UID
exports.findSome = (req, res) => {
    PromotionalNotification.find({SenderID: req.params.UID})
    .then(promotionalNotification => {
        if(!promotionalNotification) {
            return res.status(404).send({
                message: "PromotionalNotification not found with id " + req.params.UID
            });            
        }
        res.send(promotionalNotification);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "PromotionalNotification not found with PromotionalNotificationid " + req.params.UID
            });                
        }
        return res.status(500).send({
            message: "Error retrieving PromotionalNotification with PromotionalNotificationid " + req.params.UID
        });
    });
};

// Update a PromotionalNotification identified by the PromotionalNotificationId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.Heading) {
        return res.status(400).send({
            message: "Heading can not be empty"
        });
    }
    else if(!req.body.Content) {
        return res.status(400).send({
            message: "Content can not be empty"
        });
    }


    // Find PromotionalNotification and update it with the request body
    PromotionalNotification.findByIdAndUpdate(req.params.promotionalNotificationId, {
        SenderID:  req.body.SenderID || "Admin",
        toWhom:  req.body.toWhom || "All Users",
        Heading:  req.body.Heading,
        Content:  req.body.Content,
        extraInfo: req.body.extraInfo || "Nill"
    }, {new: true})
    .then(promotionalNotification => {
        if(!promotionalNotification) {
            return res.status(404).send({
                message: "PromotionalNotification not found with PromotionalNotificationid " + req.params.promotionalNotificationId
            });
        }
        res.send(promotionalNotification);
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "PromotionalNotification not found with PromotionalNotificationid " + req.params.promotionalNotificationId
            });                
        }
        return res.status(500).send({
            message: "Error updating PromotionalNotification with PromotionalNotificationid " + req.params.promotionalNotificationId
        });
    });
};

// Delete a PromotionalNotification with the specified PromotionalNotificationId in the request
exports.delete = (req, res) => {
    PromotionalNotification.findByIdAndRemove(req.params.promotionalNotificationId)
    .then(promotionalNotification => {
        if(!promotionalNotification) {
            return res.status(404).send({
                message: "promotionalNotification not found with id " + req.params.promotionalNotificationId
            });
        }
        res.send({message: "promotionalNotification deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "promotionalNotification not found with promotionalNotificationId " + req.params.promotionalNotificationId
            });                
        }
        return res.status(500).send({
            message: "Could not delete promotionalNotification with promotionalNotificationId " + req.params.promotionalNotificationId
        });
    });
};