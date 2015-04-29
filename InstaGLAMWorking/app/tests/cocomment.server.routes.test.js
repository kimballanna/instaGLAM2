'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Cocomment = mongoose.model('Cocomment'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, cocomment;

/**
 * Cocomment routes tests
 */
describe('Cocomment CRUD tests', function() {
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

		// Save a user to the test db and create new Cocomment
		user.save(function() {
			cocomment = {
				name: 'Cocomment Name'
			};

			done();
		});
	});

	it('should be able to save Cocomment instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Cocomment
				agent.post('/cocomments')
					.send(cocomment)
					.expect(200)
					.end(function(cocommentSaveErr, cocommentSaveRes) {
						// Handle Cocomment save error
						if (cocommentSaveErr) done(cocommentSaveErr);

						// Get a list of Cocomments
						agent.get('/cocomments')
							.end(function(cocommentsGetErr, cocommentsGetRes) {
								// Handle Cocomment save error
								if (cocommentsGetErr) done(cocommentsGetErr);

								// Get Cocomments list
								var cocomments = cocommentsGetRes.body;

								// Set assertions
								(cocomments[0].user._id).should.equal(userId);
								(cocomments[0].name).should.match('Cocomment Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Cocomment instance if not logged in', function(done) {
		agent.post('/cocomments')
			.send(cocomment)
			.expect(401)
			.end(function(cocommentSaveErr, cocommentSaveRes) {
				// Call the assertion callback
				done(cocommentSaveErr);
			});
	});

	it('should not be able to save Cocomment instance if no name is provided', function(done) {
		// Invalidate name field
		cocomment.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Cocomment
				agent.post('/cocomments')
					.send(cocomment)
					.expect(400)
					.end(function(cocommentSaveErr, cocommentSaveRes) {
						// Set message assertion
						(cocommentSaveRes.body.message).should.match('Please fill Cocomment name');
						
						// Handle Cocomment save error
						done(cocommentSaveErr);
					});
			});
	});

	it('should be able to update Cocomment instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Cocomment
				agent.post('/cocomments')
					.send(cocomment)
					.expect(200)
					.end(function(cocommentSaveErr, cocommentSaveRes) {
						// Handle Cocomment save error
						if (cocommentSaveErr) done(cocommentSaveErr);

						// Update Cocomment name
						cocomment.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Cocomment
						agent.put('/cocomments/' + cocommentSaveRes.body._id)
							.send(cocomment)
							.expect(200)
							.end(function(cocommentUpdateErr, cocommentUpdateRes) {
								// Handle Cocomment update error
								if (cocommentUpdateErr) done(cocommentUpdateErr);

								// Set assertions
								(cocommentUpdateRes.body._id).should.equal(cocommentSaveRes.body._id);
								(cocommentUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Cocomments if not signed in', function(done) {
		// Create new Cocomment model instance
		var cocommentObj = new Cocomment(cocomment);

		// Save the Cocomment
		cocommentObj.save(function() {
			// Request Cocomments
			request(app).get('/cocomments')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Cocomment if not signed in', function(done) {
		// Create new Cocomment model instance
		var cocommentObj = new Cocomment(cocomment);

		// Save the Cocomment
		cocommentObj.save(function() {
			request(app).get('/cocomments/' + cocommentObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', cocomment.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Cocomment instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Cocomment
				agent.post('/cocomments')
					.send(cocomment)
					.expect(200)
					.end(function(cocommentSaveErr, cocommentSaveRes) {
						// Handle Cocomment save error
						if (cocommentSaveErr) done(cocommentSaveErr);

						// Delete existing Cocomment
						agent.delete('/cocomments/' + cocommentSaveRes.body._id)
							.send(cocomment)
							.expect(200)
							.end(function(cocommentDeleteErr, cocommentDeleteRes) {
								// Handle Cocomment error error
								if (cocommentDeleteErr) done(cocommentDeleteErr);

								// Set assertions
								(cocommentDeleteRes.body._id).should.equal(cocommentSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Cocomment instance if not signed in', function(done) {
		// Set Cocomment user 
		cocomment.user = user;

		// Create new Cocomment model instance
		var cocommentObj = new Cocomment(cocomment);

		// Save the Cocomment
		cocommentObj.save(function() {
			// Try deleting Cocomment
			request(app).delete('/cocomments/' + cocommentObj._id)
			.expect(401)
			.end(function(cocommentDeleteErr, cocommentDeleteRes) {
				// Set message assertion
				(cocommentDeleteRes.body.message).should.match('User is not logged in');

				// Handle Cocomment error error
				done(cocommentDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Cocomment.remove().exec();
		done();
	});
});