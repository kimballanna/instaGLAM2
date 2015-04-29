'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var cocomments = require('../../app/controllers/cocomments.server.controller');

	// Cocomments Routes
	app.route('/cocomments')
		.get(cocomments.list)
		.post(users.requiresLogin, cocomments.create);

	app.route('/cocomments/:cocommentId')
		.get(cocomments.read)
		.put(users.requiresLogin, cocomments.hasAuthorization, cocomments.update)
		.delete(users.requiresLogin, cocomments.hasAuthorization, cocomments.delete);

	// Finish by binding the Cocomment middleware
	app.param('cocommentId', cocomments.cocommentByID);
};
