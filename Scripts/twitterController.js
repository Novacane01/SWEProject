angular.module('trends').controller('TwitterController',['$scope', 'Trends',
    function($scope,Trends){
        $scope.searchName = null;
        $scope.placeType = 'Country';
        $scope.updateTrends = (location,placeType)=>{
            console.log(placeType);
            Trends.getTrends(location,placeType).then((response,placeType)=>{
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
        $scope.updateTrends("United States",$scope.placeType);
    }
]);