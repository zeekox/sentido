'use strict';

require.config({
		paths: {
			jquery: '../bower_components/jquery/jquery.min',
			leaflet: '../bower_components/leaflet/dist/leaflet',
			underscore: '../bower_components/underscore/underscore',
			angular: '../bower_components/angular/angular',
			ngRoute: '../bower_components/angular-route/angular-route',
			ngResource: '../bower_components/angular-resource/angular-resource',
			angularAMD: '../bower_components/angularAMD/angularAMD',
			ngload: '../bower_components/angularAMD/ngload'
		},
		shim: {
			'leaflet': {
				exports: 'L'
			},
			'angular': {
				exports: 'angular',
				deps: ['jquery']
			},
			'ngResource': {
				exports: 'angular',
				deps: ['angular']
			},
			'ngRoute': {
				exports: 'angular',
				deps: ['angular']
			},

		'angularAMD': ['angular', 'ngResource', 'ngRoute'],
        'ngload': ['angularAMD']
    },    
    deps: ['app'] 
});

/*require([ 'angularAMD'],
	function (angularAMD) {


	angular.element(document).ready(function() {

		angularAMD.bootstrap(document, ['project']);
	});

});
*/
