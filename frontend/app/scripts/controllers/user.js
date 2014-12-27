define([
		'./module',
		'services/user'
	],
	function (controllers, user) {
		'use strict';
		controllers.controller('UserCtrl', ['$scope', 'user', function ($scope, User) {
				if(User){
					User.get(function(result) {
						$scope.user = result;
					});
				}
		}]);
});
