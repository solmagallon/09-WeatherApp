(function(){
	'use strict';

	angular
		.module('app')
		.factory('weatherFactory', weatherFactory)

	weatherFactory.$inject = ['$http', '$q', '$log', '$cacheFactory'];
	function weatherFactory($http, $q, $log, $cacheFactory){

		var service = {
			getWeather: getWeather
		}

		return service;

		function getWeather(cityId){
			//create a string containing the weather API's URL with the API key adn city Id.
			var apiUrl = "http://api.openweathermap.org/data/2.5/forecast/city?id=";
			apiUrl += cityId;
			apiUrl += "&APPID=517c2c1302879d8eb8f76f9c94a4aa0f";

			// create a get request.
			var defer = $q.defer();
			$http({
				method: "GET",
				url: apiUrl,
				cache: true
			}).then(function(response){
				if (typeof response.data === 'object'){
					defer.resolve(response);
					toastr.success("Weather data successfully obtained.");
				} else {
					defer.reject(response);
					toastr.warning("No weather data found");
				}
			},
			function(error){
				defer.reject(error);
				$log.error(error);
				toastr.error("Error: " + error.data + "<br>Status: " + error.statusText)
			});

		return defer.promise
		}

	}
})()