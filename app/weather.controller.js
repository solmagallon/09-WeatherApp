(function() {
    'use strict';

    angular
        .module('app')
        .controller('WeatherController', WeatherController);

    WeatherController.$inject = ['$log', 'WeatherFactory'];

    /* @ngInject */
    function WeatherController($log, WeatherFactory) {
        var vm = this;
        vm.title = 'WeatherController';

        activate();

        ////////////////

        function activate() {
            WeatherFactory.getWeather().then(
                function(response){
                    vm.weather = response.data;

                },
                function(error){
                    $log.error('failure getting weather', error);
                });
        }
    }
})();