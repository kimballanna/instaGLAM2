'use strict';
var tweets = require('../../app/controllers/tweets.server.controller');
	
module.exports = function(app) {
	
	app.get('/tweets/user_tweets/:user', tweets.findTweets);
};