'use strict';

angular.module('tweets')
.controller('TweetsController', ['$scope','$resource',
	function($scope, $resource) {

	  // set a default username value
      $scope.username = 'twitter';
      
      // empty tweet model
      $scope.tweetsResult = [];

    /**
     * requests and processes tweet data
     */
    $scope.getTweets = function() {
		$scope.tweetsResult = [];
		var params = {
			action: 'user_tweets',
			user: $scope.username
		};
		// create Tweet data resource
		$scope.tweets = $resource('/tweets/:action/:user', params);

		// GET request using the resource
		$scope.tweets.query( { }, function (res) {
			$scope.tweetsResult = $scope.tweetsResult.concat(res);
		});
    };

}]);