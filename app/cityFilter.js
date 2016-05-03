(function() {
    'use strict';

	angular
        .module('app')
        .filter('city', function(){
    		return function(items, city, country){
                var cityList = items;
                // filter the list of matching cities to include only those that are in the 
                // specified country.
                if (country){
                    console.log("test" + country)
    				var countryQuery = country.toLowerCase();
    				cityList = cityList.filter(function(element){
    					var lowCountry = element.country.toLowerCase();
    					if (lowCountry.search(countryQuery) >= 0)
    						return true;
    				})
    			}
                if (city){
                    var cityQuery = city.toLowerCase();
                    
                    // make a list of all cities that match the first part f the query
                    var cityList = cityList.filter(function(element){
                        var lowName = element.name.toLowerCase();
                        if (lowName.search(cityQuery) >= 0)
                            return true;
                    });
                }
                

    			return cityList;
	    	}
	    });
    
})();