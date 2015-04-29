'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Cocomment = mongoose.model('Cocomment'),
	_ = require('lodash');

/**
 * Create a Cocomment
 */
exports.create = function(req, res) {
	var cocomment = new Cocomment(req.body);
	cocomment.user = req.user;

	cocomment.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(cocomment);
		}
	});
};

/**
 * Show the current Cocomment
 */
exports.read = function(req, res) {
	res.jsonp(req.cocomment);
};

/**
 * Update a Cocomment
 */
exports.update = function(req, res) {
	var cocomment = req.cocomment ;

	cocomment = _.extend(cocomment , req.body);

	cocomment.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(cocomment);
		}
	});
};

/**
 * Delete an Cocomment
 */
exports.delete = function(req, res) {
	var cocomment = req.cocomment ;

	cocomment.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(cocomment);
		}
	});
};

/**
 * List of Cocomments
 */
exports.list = function(req, res) { 
	Cocomment.find().sort('-created').populate('user', 'displayName').exec(function(err, cocomments) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(cocomments);
		}
	});
};

/**
 * Cocomment middleware
 */
exports.cocommentByID = function(req, res, next, id) { 
	Cocomment.findById(id).populate('user', 'displayName').exec(function(err, cocomment) {
		if (err) return next(err);
		if (! cocomment) return next(new Error('Failed to load Cocomment ' + id));
		req.cocomment = cocomment ;
		next();
	});
};

/**
 * Cocomment authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.cocomment.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
