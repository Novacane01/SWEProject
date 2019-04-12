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
                if(trends != null){
                    console.log(trends);
                    trends.forEach(element => {
                        $scope.trending.push(element);
                    });
                }
                else{
                    // $window.alert("No trends available");
                }
            },(err)=>{
                console.log('Unable to retrieve trends:',err);
            });
        }
        $scope.updateTrends("United States",$scope.placeType);
    }
]);