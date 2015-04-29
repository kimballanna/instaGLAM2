'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Commement = mongoose.model('Commement'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, commement;

/**
 * Commement routes tests
 */
describe('Commement CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Commement
		user.save(function() {
			commement = {
				name: 'Commement Name'
			};

			done();
		});
	});

	it('should be able to save Commement instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Commement
				agent.post('/commements')
					.send(commement)
					.expect(200)
					.end(function(commementSaveErr, commementSaveRes) {
						// Handle Commement save error
						if (commementSaveErr) done(commementSaveErr);

						// Get a list of Commements
						agent.get('/commements')
							.end(function(commementsGetErr, commementsGetRes) {
								// Handle Commement save error
								if (commementsGetErr) done(commementsGetErr);

								// Get Commements list
								var commements = commementsGetRes.body;

								// Set assertions
								(commements[0].user._id).should.equal(userId);
								(commements[0].name).should.match('Commement Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Commement instance if not logged in', function(done) {
		agent.post('/commements')
			.send(commement)
			.expect(401)
			.end(function(commementSaveErr, commementSaveRes) {
				// Call the assertion callback
				done(commementSaveErr);
			});
	});

	it('should not be able to save Commement instance if no name is provided', function(done) {
		// Invalidate name field
		commement.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Commement
				agent.post('/commements')
					.send(commement)
					.expect(400)
					.end(function(commementSaveErr, commementSaveRes) {
						// Set message assertion
						(commementSaveRes.body.message).should.match('Please fill Commement name');
						
						// Handle Commement save error
						done(commementSaveErr);
					});
			});
	});

	it('should be able to update Commement instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Commement
				agent.post('/commements')
					.send(commement)
					.expect(200)
					.end(function(commementSaveErr, commementSaveRes) {
						// Handle Commement save error
						if (commementSaveErr) done(commementSaveErr);

						// Update Commement name
						commement.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Commement
						agent.put('/commements/' + commementSaveRes.body._id)
							.send(commement)
							.expect(200)
							.end(function(commementUpdateErr, commementUpdateRes) {
								// Handle Commement update error
								if (commementUpdateErr) done(commementUpdateErr);

								// Set assertions
								(commementUpdateRes.body._id).should.equal(commementSaveRes.body._id);
								(commementUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Commements if not signed in', function(done) {
		// Create new Commement model instance
		var commementObj = new Commement(commement);

		// Save the Commement
		commementObj.save(function() {
			// Request Commements
			request(app).get('/commements')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Commement if not signed in', function(done) {
		// Create new Commement model instance
		var commementObj = new Commement(commement);

		// Save the Commement
		commementObj.save(function() {
			request(app).get('/commements/' + commementObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', commement.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Commement instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Commement
				agent.post('/commements')
					.send(commement)
					.expect(200)
					.end(function(commementSaveErr, commementSaveRes) {
						// Handle Commement save error
						if (commementSaveErr) done(commementSaveErr);

						// Delete existing Commement
						agent.delete('/commements/' + commementSaveRes.body._id)
							.send(commement)
							.expect(200)
							.end(function(commementDeleteErr, commementDeleteRes) {
								// Handle Commement error error
								if (commementDeleteErr) done(commementDeleteErr);

								// Set assertions
								(commementDeleteRes.body._id).should.equal(commementSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Commement instance if not signed in', function(done) {
		// Set Commement user 
		commement.user = user;

		// Create new Commement model instance
		var commementObj = new Commement(commement);

		// Save the Commement
		commementObj.save(function() {
			// Try deleting Commement
			request(app).delete('/commements/' + commementObj._id)
			.expect(401)
			.end(function(commementDeleteErr, commementDeleteRes) {
				// Set message assertion
				(commementDeleteRes.body.message).should.match('User is not logged in');

				// Handle Commement error error
				done(commementDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Commement.remove().exec();
		done();
	});
});