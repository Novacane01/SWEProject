angular.module('trends').factory('Trends', function($http) {
    var methods = {
        getTrends:(location,placeType)=>{
            var i = $http.get(`http://localhost:8080/twitter/trendingAt?name=${location}&placeType=${placeType}`);
            console.log(i);
            return i;
        }
    }
    return methods;
});
