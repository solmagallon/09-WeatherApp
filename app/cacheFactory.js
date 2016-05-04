(function(){
    angular
        .module('app')
        .factory('cachedFactory', cacheFactoryFunc)

    cachedFactory.$inject = ['$cacheFactory', '$http'];
    function cacheFactoryFunc($cacheFactory, $http){

        var service = {
            getCache: getCache
        }

        return service;

        function getCache(cityId){
			//create a string containing the weather API's URL with the API key adn city Id.
			var apiUrl = "http://api.openweathermap.org/data/2.5/forecast/city?id=";
			apiUrl += cityId;
			apiUrl += "&APPID=517c2c1302879d8eb8f76f9c94a4aa0f";

			// check cache to see if request has already been made.
			var httpCache = $cacheFactory.get('$http');
			var cachedResponse = httpCache.get(apiUrl);
			if (cachedResponse){
				var data = JSON.parse(cachedResponse[1]);
                return weather = {
                    city: data.city.name,
                    lat: data.city.coord.lat,
                    lng: data.city.coord.lon,
                    temperature: data.list[0].main.temp,
                    pressure: data.list[0].main.pressure,
                    humidity: data.list[0].main.humidity,
                    lowestTemp: data.list[0].main.temp_min,
                    highestTemp: data.list[0].main.temp_max,
                    windSpeed: data.list[0].wind.speed
                }
			}
        }
    }
})();