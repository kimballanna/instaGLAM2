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
				  $rootScope.myValue2=false;
		});
		Socket.on('photo.created', function(photo) {
			console.log(photo);
                  $rootScope.myValue2=true;
				  $rootScope.myValue=false;
		});
	}
]);