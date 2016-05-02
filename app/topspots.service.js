(function() {
    'use strict';

    angular
        .module('app')
        .factory('TopspotsFactory', TopspotsFactory);

    TopspotsFactory.$inject = ['$http', '$q', '$log'];

    /* @ngInject */
    function TopspotsFactory($http, $q, $log) {

        var service = {
            getTopspots: getTopspots
        };

        return service;


        function getTopspots() {

        	var defer = $q.defer();
        	$http({
      			method: 'GET',
      			url: 'app/locations.json'})
        	.then(
      		function(response) {
      			if(typeof response.data === 'object'){
					defer.resolve(response);
					toastr.success('We have top spots!');
				} else {
					defer.reject(response);
					toastr.warning('no hot spots found<br/>' + response.config.url);
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