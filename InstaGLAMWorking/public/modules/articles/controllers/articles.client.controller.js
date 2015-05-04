'use strict';
//add socket to dependencies
angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Socket', 'Articles',
	//add socket to parameters
	function($scope, $stateParams, $location, Authentication, Socket, Articles) {
		$scope.authentication = Authentication;


// Create new Photo
		$scope.createPhoto = function() {
			// Create new Photo object
			var photo = new Photos ({
			  name: this.name,
			  //Desciption test
			  //description: this.description
			});
			
		  photo.$save(function(response) {
		    $location.path('photos/' + response._id);

		    // Clear form fields
					$scope.name = '';

                    $scope.image = '';
		  }, function(errorResponse) {
		       $scope.error = errorResponse.data.message;
		     });
                  
		};

		
		$scope.create = function() {
			var article = new Articles({
				title: this.title,
				content: this.content,
				lon: this.lon,
				lat: this.lat,
				//
				photo: this.photo

			});
			article.$save(function(response) {
				$location.path('articles/' + response._id);
				$scope.title = '';
				$scope.content = '';
				//
				$scope.photo = '';
				$scope.lon = 0;
				$scope.lat = 0;
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};
		
		$scope.$on('mapInitialized', function(event,map) {

  			var marker = map.markers[0];


  			$scope.$watch('article.lat + article.lon',function(newVal,oldVal){
  		  	
  		  	if(newVal === oldVal){
    		return;
  				}
  			// checks if value has changed

  			map.setCenter({lat:$scope.article.lat, lng:$scope.article.lon});
			marker.setPosition({lat:$scope.article.lat, lng:$scope.article.lon});
			});

  		});

		//marker link
  		$scope.gotolink= function(event,i) {
  			$location.path('articles/'+ i._id);

		};
	}
]);