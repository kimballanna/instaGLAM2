'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$rootScope', 'Authentication', 'Menus', 'Socket',
	function($scope, $rootScope, Authentication, Menus, Socket) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
		
		Socket.on('article.created', function(article) {
			console.log(article);
                  $rootScope.myValue=true;
<<<<<<< HEAD
				  $rootScope.myValue5=false;
				  $rootScope.myValue4=false;
=======
>>>>>>> origin/master
				  $rootScope.myValue2=false;
		});
		Socket.on('photo.created', function(photo) {
			console.log(photo);
                  $rootScope.myValue2=true;
<<<<<<< HEAD
				  $rootScope.myValue5=false;
				  $rootScope.myValue4=false;
				  $rootScope.myValue=false;
				  $rootScope.myValue3=false;
		});
		Socket.on('photo.updated', function(photo) {
			console.log(photo);
                  $rootScope.myValue3=true;
				  $rootScope.myValue5=false;
				  $rootScope.myValue4=false;
				  $rootScope.myValue2=false;
				  $rootScope.myValue=false;
		});
		Socket.on('photo.deleted', function(photo) {
			console.log(photo);
                  $rootScope.myValue4=true;
				  $rootScope.myValue5=false;
				  $rootScope.myValue3=false;
				  $rootScope.myValue2=false;
				  $rootScope.myValue=false;
		});
		Socket.on('user.updated', function(photo) {
			//console.log(user);
                  $rootScope.myValue5=true;
				  $rootScope.myValue4=false;
				  $rootScope.myValue3=false;
				  $rootScope.myValue2=false;
=======
>>>>>>> origin/master
				  $rootScope.myValue=false;
		});
	}
]);