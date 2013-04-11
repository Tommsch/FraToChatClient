'use strict';

/* App Module */
angular.module('chatClient', []).
	config(['$routeProvider', function($routeProvider){
		$routeProvider.
			when('/login', {templateUrl: 'partials/login.html', controller: loginCtrl}).
			otherwise({redirectTo: 'login'}).
			
			when('/chat', {templateUrl: 'partials/chat.html', controller: loginCtrl}).
			otherwise({redirectTo: 'chat'});
		
	}]);