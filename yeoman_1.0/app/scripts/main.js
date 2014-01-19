'use strict';

require.config({
		paths: {
			jquery: '../bower_components/jquery/jquery.min',
			leaflet: '../bower_components/leaflet/dist/leaflet',
			underscore: '../bower_components/underscore/underscore',
			angular: '../bower_components/angular/angular',
			ngRoute: '../bower_components/angular-route/angular-route',
			ngResource: '../bower_components/angular-resource/angular-resource',
			domReady: '../bower_components/requirejs-domready/domReady'
		},
		shim: {
			'leaflet': {
				exports: 'L'
			},
			'angular': {
				exports: 'angular',
				deps: ['jquery']
			},
			'ngRoute': {
				exports: 'angular',
				deps: ['angular']
			},
			'ngResource': {
				exports: 'angular',
				deps: ['angular']
			}

		},
		// kick start application
		deps: ['./bootstrap']
});
/*
require([ 'directives/map', 'app', 'angular'],
	function (dir, app, angular) {


	angular.element(document).ready(function() {
		angular.bootstrap(document, [app.mainModule]);
	});

});
*/
