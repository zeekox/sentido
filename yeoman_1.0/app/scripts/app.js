define([
		'angularAMD',
               'services/trail',
               'controllers/list',
		'directives/map'
	],

	function (angularAMD, mapDirective, trailService) {

		'use strict';


var app =		angular.module('sentido', [mapDirective, trailService]);

angularAMD.bootstrap(app);
		app.config(function ($routeProvider) {
				$routeProvider.
				when('/', {controller: listController.list, templateUrl: 'list.html'}).
				//when('/edit/:trailId', { controller: listController.list, templateUrl: 'list.html'}).
				otherwise({redirectTo: '/'});
		});

		return {
			mainModule: ngMainModule
		};

});
