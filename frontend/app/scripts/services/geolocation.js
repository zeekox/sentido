define([
		],

		function() {

			'use strict';

			return {
				getPosition:  function(scope, q) {
					var deferred = q.defer();

					if (navigator.geolocation) {

						var errorCoor = function(arg){

							deferred.reject(arg.message);

						};

						navigator.geolocation.getCurrentPosition(
							function (position) {
								scope.$apply(function() {
									deferred.resolve(position.coords);
								});
						}, errorCoor, {maximumAge:60000, timeout:15000, enableHighAccuracy:true});


					} else {
						deferred.reject('No position!');
					}

					return deferred.promise;
				}

			};
});
