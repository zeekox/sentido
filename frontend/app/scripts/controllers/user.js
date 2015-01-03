define([
		'./module'
	],
	function (controllers) {
		'use strict';
		controllers.controller('UserCtrl', ['$scope', 'user', function ($scope, User) {
				if(User){
					User.get(function(result) {
						$scope.user = result;
					});
				}
		}]);
});
