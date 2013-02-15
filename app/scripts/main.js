require.config({
		paths: {
			jquery: '../components/jquery/jquery.min',
			leaflet: '../components/leaflet/dist/leaflet',
			underscore: '../components/underscore/underscore',
			angular: '../components/angular/angular',
			ngResource: '../components/angular-resource/angular-resource'
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
			}

		}
});

require(['app'], function(app) {

	angular.element(document).ready(function() {
		angular.bootstrap(document, [app.mainModule]);
	});

});
