'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Commement = mongoose.model('Commement'),
	_ = require('lodash');

/**
 * Create a Commement
 */
exports.create = function(req, res) {
	var commement = new Commement(req.body);
	commement.user = req.user;

	commement.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(commement);
		}
	});
};

/**
 * Show the current Commement
 */
exports.read = function(req, res) {
	res.jsonp(req.commement);
};

/**
 * Update a Commement
 */
exports.update = function(req, res) {
	var commement = req.commement ;

	commement = _.extend(commement , req.body);

	commement.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(commement);
		}
	});
};

/**
 * Delete an Commement
 */
exports.delete = function(req, res) {
	var commement = req.commement ;

	commement.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(commement);
		}
	});
};

/**
 * List of Commements
 */
exports.list = function(req, res) { 
	Commement.find().sort('-created').populate('user', 'displayName').exec(function(err, commements) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(commements);
		}
	});
};

/**
 * Commement middleware
 */
exports.commementByID = function(req, res, next, id) { 
	Commement.findById(id).populate('user', 'displayName').exec(function(err, commement) {
		if (err) return next(err);
		if (! commement) return next(new Error('Failed to load Commement ' + id));
		req.commement = commement ;
		next();
	});
};

/**
 * Commement authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.commement.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
