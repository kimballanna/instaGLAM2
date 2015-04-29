'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Commement Schema
 */
var CommementSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Commement name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Commement', CommementSchema);