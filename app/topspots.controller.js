(function() {
    'use strict';

    angular
        .module('app')
        .controller('TopspotsController', TopspotsController);

    TopspotsController.$inject = ['TopspotsFactory','$log'];

    /* @ngInject */
    function TopspotsController(TopspotsFactory, $log) {

        var vm = this;
        vm.title = 'TopspotsController';
       
        activate();

        function activate() {

        	TopspotsFactory.getTopspots().then(
        		function(response) { 
              		vm.topSpots = response.data;
          		},
          		function(error) {
              		$log.error('failure getting top spots', error);
          		});

        }
    }
})();