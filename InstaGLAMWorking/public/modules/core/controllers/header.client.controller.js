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
				  $rootScope.myValue3=false;
				  $rootScope.myValue4=false;
				  $rootScope.myValue5=false;
				  $rootScope.myValue6=false;
				  $rootScope.myValue7=false;
				  $rootScope.myValue8=false;
		});
		Socket.on('photo.created', function(photo) {
			console.log(photo);
                  $rootScope.myValue2=true;
				  $rootScope.myValue=false;
				  $rootScope.myValue3=false;
				  $rootScope.myValue4=false;
				  $rootScope.myValue5=false;
				  $rootScope.myValue6=false;
				  $rootScope.myValue7=false;
				  $rootScope.myValue8=false;
		});
		Socket.on('photo.updated', function(photo) {
			console.log(photo);
                  $rootScope.myValue3=true;
				  $rootScope.myValue=false;
				  $rootScope.myValue2=false;
				  $rootScope.myValue4=false;
				  $rootScope.myValue5=false;
				  $rootScope.myValue6=false;
				  $rootScope.myValue7=false;
				  $rootScope.myValue8=false;
		});
		Socket.on('photo.deleted', function(photo) {
			console.log(photo);
                  $rootScope.myValue4=true;
				  $rootScope.myValue=false;
				  $rootScope.myValue2=false;
				  $rootScope.myValue3=false;
				  $rootScope.myValue5=false;
				  $rootScope.myValue6=false;
				  $rootScope.myValue7=false;
				  $rootScope.myValue8=false;
		});
		Socket.on('profile.updated', function(profile) {
			console.log(profile);
                  $rootScope.myValue5=true;
				  $rootScope.myValue=false;
				  $rootScope.myValue2=false;
				  $rootScope.myValue3=false;
				  $rootScope.myValue4=false;
				  $rootScope.myValue6=false;
				  $rootScope.myValue7=false;
				  $rootScope.myValue8=false;
		});
		Socket.on('user.updated', function(profile) {
			//console.log(profile);
                  $rootScope.myValue6=true;
				  $rootScope.myValue=false;
				  $rootScope.myValue2=false;
				  $rootScope.myValue3=false;
				  $rootScope.myValue4=false;
				  $rootScope.myValue5=false;
				  $rootScope.myValue7=false;
				  $rootScope.myValue8=false;
		});
		Socket.on('article.updated', function(article) {
			console.log(article);
                  $rootScope.myValue7=true;
				  $rootScope.myValue2=false;
				  $rootScope.myValue3=false;
				  $rootScope.myValue4=false;
				  $rootScope.myValue5=false;
				  $rootScope.myValue6=false;
				  $rootScope.myValue=false;
				  $rootScope.myValue8=false;
		});
		Socket.on('article.deleted', function(article) {
			console.log(article);
                  $rootScope.myValue8=true;
				  $rootScope.myValue2=false;
				  $rootScope.myValue3=false;
				  $rootScope.myValue4=false;
				  $rootScope.myValue5=false;
				  $rootScope.myValue6=false;
				  $rootScope.myValue7=false;
				  $rootScope.myValue=false;
		});
	}
]);