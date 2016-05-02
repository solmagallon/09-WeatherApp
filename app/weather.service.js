(function() {
    'use strict';

    angular
        .module('app')
        .factory('WeatherFactory', WeatherFactory);

    WeatherFactory.$inject = ['$http', '$q', '$log'];

    /* @ngInject */
    function WeatherFactory($http, $q, $log) {

        var service = {
            getWeather: getWeather
        };

        return service;


        function getWeather() {

        	var defer = $q.defer();
        	$http({
      			method: 'GET',
      			url: 'app/city.list.json'})
        	.then(
      		function(response) {
      			if(typeof response.data === 'object'){
					defer.resolve(response);
					toastr.success('Here is the Weather');
				} else {
					defer.reject(response);
					toastr.warning('City not found<br/>' + response.config.url);
				}
      		}, 
      		// failure
      		function(error) {
          		defer.reject(error);
          		$log.error(error);
          		toastr.error('error: ' + error.data + '<br/>status: ' + error.statusText);
       		});

      		return defer.promise;
        }
    }
})();

// {"ip":"174.66.185.155","about":"/about","Pro!":"http://getjsonip.com"}