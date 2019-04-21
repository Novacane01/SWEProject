angular.module('trends').controller('TwitterController',['$scope', 'Trends',
    function($scope,Trends){
        $scope.searchName = null;
        // $scope.locations = Trends.getLocations().then((response)=>{
        //     console.log(response);
        // });
        $scope.placeType = 'Country';
        $scope.updateOptions = ()=>{
            Trends.getLocations().then((response)=>{
                var data = response.data;
                if(data!=null){
                    $scope.options = data;
                }
            });
        }
        $scope.updateTrends = (location,placeType)=>{
            console.log(placeType);
            Trends.getTrends(location,placeType).then((response)=>{
                console.log(response);
                $scope.trending = [];
                var trends = response.data;
                if(trends != null){
                    console.log(trends);
                    trends.forEach(element => {
                        $scope.trending.push(element);
                    });
                }
            },(err)=>{
                console.log('Unable to retrieve trends:',err);
            });
        }
        $scope.updateTrends("United States",$scope.placeType);
        $scope.updateOptions();
    }
]);