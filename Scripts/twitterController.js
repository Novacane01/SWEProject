angular.module('trends').controller('TwitterController',['$scope', 'Trends',
    function($scope,Trends){
        $scope.searchName = null;
        $scope.updateTrends = (location)=>{
            console.log("clicked");
            Trends.getTrends(location).then((response)=>{
                console.log(response);
                $scope.trending = [];
                var trends = response.data;
                trends.forEach(element => {
                    $scope.trending.push(element);
                });
            },(err)=>{
                console.log('Unable to retrieve trends:',err);
            });
        }
        $scope.updateTrends("United States");
    }
]);