angular.module('trends').factory('Trends', function($http) {
    var methods = {
        getTrends:(location)=>{
            var i = $http.get(`http://localhost:8080/twitter/trendingAt?name=${location}&placeType=Country`);
            console.log(i);
            return i;
        }
    }
    return methods;
});
