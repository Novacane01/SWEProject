angular.module('trends').factory('Trends', function($http) {
    var methods = {
        getTrends:(location,placeType)=>{
            return $http.get(`http://localhost:8080/twitter/trendingAt?name=${location}&placeType=${placeType}`);
        },
        getLocations:()=>{
            return $http.get('http://localhost:8080/locations');
        },
        getTweets:(trend)=>{
            return $http.get(`http://localhost:8080/twitter/trendingTweets?trend=${trend}`);
        }
    }
    return methods;
});
