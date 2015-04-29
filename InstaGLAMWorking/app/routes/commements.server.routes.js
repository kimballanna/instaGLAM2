'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var commements = require('../../app/controllers/commements.server.controller');

	// Commements Routes
	app.route('/commements')
		.get(commements.list)
		.post(users.requiresLogin, commements.create);

	app.route('/commements/:commementId')
		.get(commements.read)
		.put(users.requiresLogin, commements.hasAuthorization, commements.update)
		.delete(users.requiresLogin, commements.hasAuthorization, commements.delete);

	// Finish by binding the Commement middleware
	app.param('commementId', commements.commementByID);
};
