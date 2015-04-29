'use strict';

// Configuring the Articles module
angular.module('tweets').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Tweets', 'tweets', 'item', '/tweets', true);
	}
]);