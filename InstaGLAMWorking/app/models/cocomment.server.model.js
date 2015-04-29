'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Cocomment Schema
 */
var CocommentSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Cocomment name',
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

mongoose.model('Cocomment', CocommentSchema);