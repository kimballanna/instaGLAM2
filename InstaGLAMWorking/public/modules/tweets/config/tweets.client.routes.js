'use strict';

//Setting up route
angular.module('tweets').config(['$stateProvider',
	function($stateProvider) {
		// Timeline state routing
		$stateProvider.
		state('tweets', {
			url: '/tweets',
			templateUrl: 'modules/tweets/views/tweets.client.view.html'
		});
	}
]);