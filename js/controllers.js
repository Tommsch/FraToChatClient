'use strict';

/* Controllers */


var loginCtrl = ['$scope' , '$http', '$location', '$timeout', function($scope, $http, $location, $timeout){

	$scope.showLogin = true;
	$scope.showChat = false;

	$scope.saveUser = function() {
		$scope.sender = $scope.formName;
 	 	$http({method: 'POST', url: 'http://luminisjschallenge.herokuapp.com/', data: angular.toJson({name: $scope.formName})})
 	 		.success(function(users, status, headers, config) {	
				console.log('new user with name: ' + $scope.formName);	
		});
		
		$scope.getUsers();
		updateChat();
 	}
 	
 	$scope.getUsers = function() {
		$scope.showLogin = false;
		$scope.showChat = true;
		
		$http({method: 'GET', url: 'http://luminisjschallenge.herokuapp.com/'})
 	 		.success(function(users, status, headers, config) {	
 	 			$scope.users = new Array();
 	 			for(var i=0;i<users.length;i++) {
  					$scope.users[i] = {name: users[i].name};
				}
			});	
	}
	
	$scope.sendMessage = function() {
		$http({method: 'POST', url: 'http://luminisjschallenge.herokuapp.com/' + $scope.receiver, data: angular.toJson({sender: $scope.sender, content: $scope.message})});
		$scope.message = " ";
	}
	
	$scope.selectUser = function(userName) {
		$scope.receiver = userName;
	}
	
	
	function updateChat() {
			$timeout(function() {
			if($scope.sender == null || $scope.receiver==null){
				$scope.messages = [];
			}
			
				$http({method: 'GET', url: 'http://luminisjschallenge.herokuapp.com/'+ $scope.sender}).success(function(chats, status, headers, config) {			
 	 				var chatList = chats;
 	 				
 	 				 	$http({method: 'GET', url: 'http://luminisjschallenge.herokuapp.com/'+ $scope.receiver}).success(function(chatss, status, headers, config) {	
 	 						chatss.forEach(function(chts) { 
 	 							chatList.push(chts);
 	 						});
 	 						 	 						
 	 						var messages = [];
 	 				
 	 						chatList.forEach(function(cht) { 
 	 							if(cht.sender == $scope.sender || cht.sender == $scope.receiver){
 	 								cht.timestamp = new Date(cht.timestamp);
 	 								messages.push(cht); 
 	 							}
 	 						});
 	 						messages.sort(function(x, y){
 	 							return y.timestamp.getTime() - x.timestamp.getTime();
							});
 	 			
 	 					$scope.messages = messages;
 	 					});	
	
 	 			});	

				updateChat();
        	}, 1000);
        
	
	}
	


	
}];
