(function() {
    'use strict';

    angular
        .module('app')
        .controller('weatherController', weatherController); 

    weatherController.$inject = ['cachedFactory', 'cityFactory', 'weatherFactory', '$scope', '$log', 'cityFilter']; // https://github.com/johnpapa/angular-styleguide/tree/master/a1#manual-annotating-for-dependency-injection

    /* @ngInject */
    function weatherController(cachedFactory, cityFactory, weatherFactory, $log, $scope, cityFilter) {
        var vm = this; // https://github.com/johnpapa/angular-styleguide/tree/master/a1/#controllers

        function kelvinToF(k){
            return (1.8 * (k-273) + 32).toFixed(1);
        }

        // vm.cities = {name: "placeholder", country: "placeholder"};

        vm.citySelection = [];

        vm.getMatches = function(cityQuery, countryQuery){
            vm.citySelection = cityFilter(vm.cities, cityQuery, countryQuery);
        }

        // past searches will be saved in this array and shown on he index page.
        vm.pastSearches = [];

        vm.select = function(c){
            var accessed = new Date();
            c.accessed = {}
            c.accessed.time = accessed.toLocaleTimeString();
            c.accessed.date = accessed.toLocaleDateString();

            // add the search to the past search list
            vm.pastSearches.unshift(c)
            vm.displayWeather(c._id);
        }

        vm.defaultCities = [
            {name:"San Diego", id:"5391811"},
            {name:"New York", id:"5128581"},
            {name:"Washington, D.C.", id:"4140963"},
            {name:"London", id:"2643743"},
            {name:"Tokyo", id:"1850147"}
        ]

        activate();

        function activate() {
            cityFactory.getCities().then(
            function(response) { 
                // the response will populate cities with all of the cities in city.list.json
                vm.cities = response.data;
            },
            function(error) {
                $log.error('failure getting weather', error);
            });
        }

        // get cached data for items in the past call list.
        vm.getCached = function(string){
            vm.weather = cachedFactory.getCache(string);
        }

        vm.displayWeather = function(cityId){
            weatherFactory.getWeather(cityId).then(
                function(response){
                    var d = response.data.list[0];

                    vm.weather = {
                        city: response.data.city.name,
                        lat: response.data.city.coord.lat,
                        lng: response.data.city.coord.lon,
                        temperature: kelvinToF(d.main.temp),
                        pressure: d.main.pressure,
                        humidity: d.main.humidity,
                        lowestTemp: kelvinToF(d.main.temp_min),
                        highestTemp: kelvinToF(d.main.temp_max),
                        windSpeed: d.wind.speed
                    }
                },
                function(error){
                    $log.error('failure getting weather');
            });
        }
        
    }
})();