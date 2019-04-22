angular.module('trends').controller('TwitterController',['$scope', 'Trends', '$sce',
    function($scope,Trends,$sce){
        $scope.searchName = null;
        $scope.type = 'Country';
        $scope.currentTrend = null;
        $scope.placeholders = ['Search by Country i.e. Canada','Search by City i.e. Tokyo','Search by trend i.e. GameOfThrones'];
        $scope.updatePlaceHolder = ()=>{
            $scope.placeholder = ($scope.type=='Country')?$scope.placeholders[0]:($scope.type=='Town')?$scope.placeholders[1]:($scope.type=='Trend')?$scope.placeholders[2]:null;
        }
        $scope.updateOptions = ()=>{
            Trends.getLocations().then((response)=>{
                console.log(response);
                var data = response.data;
                if(data!=null){
                    $scope.options = data;
                    console.log('Getting trends');
                    // $scope.getAllTrends();
                }
            },(err)=>{
                console.log('Unable to update options:',err);
            });
        }
        $scope.updateTrends = (search,type)=>{
            if(type=='Trend'){
                $scope.updateTweets(search);
                document.getElementById("openModalButton").click();
            }
            else{
                Trends.getTrends(search,type).then((response)=>{
                    var trends = response.data;
                    if(trends != null && trends != ""){
                        trends.sort((a,b)=>{
                            return b.tweet_volume-a.tweet_volume;
                        });
                        $scope.trending = trends;
                        $scope.updateGraph();
                    }
                },(err)=>{
                    console.log('Unable to retrieve trends:',err);
                });
            }
        }
        $scope.updateTweets = (trend)=>{
            Trends.getTweets(trend).then((response)=>{
                var tweets = response.data;
                if(tweets!=null){
                    var re = new RegExp("#"+trend, 'gi');
                    tweets.forEach((element)=>{
                        var t = element.text.match(re);
                        element.text = $sce.trustAsHtml(element.text.replace(re, '<b>'+t+'</b>'));
                        element.created_at = new Date(element.created_at).toLocaleString();
                    });
                    $scope.tweets = tweets;
                    $scope.currentTrend = trend;
                }
            });
        }
        $scope.getAllTrends = ()=>{
            $scope.trends = [];            
            Trends.getTrends('Worldwide','Supername').then((response)=>{
                if(response != null){
                    var trends = response.data;
                    console.log(trends);
                }
            },(err)=>{
                console.log(err);
            });
        }
        $scope.updateGraph = ()=>{
            var trendNames = [];
            var trendData = [];
            $scope.trending.forEach((element)=>{
                if(element.tweet_volume>0){
                    trendNames.push(element.name);
                    trendData.push(element.tweet_volume);
                }
            });
            var ctx = document.getElementById('myChart').getContext('2d');
            var chart = new Chart(ctx, {
              // The type of chart we want to create
              type: 'line',
              // The data for our dataset
              data: {
                  labels: trendNames,
                  datasets: [{
                      label: 'Tweet Volume',
                      backgroundColor: 'rgba(145, 205, 255,.5)',
                      borderColor: 'rgb(145, 205, 255)',
                      data: trendData
                  }]
              },
          
              // Configuration options go here
              options: {
                layout: {
                    padding: {
                        left: 50,
                        right: 50,
                        top: 0,
                        bottom: 0
                        }
                    },
                    scales: {
                        yAxes: [{ticks: {fontSize: 12, fontFamily: "'Montserrat', sans-serif", fontColor: '#000', fontStyle: '500'}}],
                        xAxes: [{ticks: {fontSize: 12, fontFamily: "'Montserrat', sans-serif", fontColor: '#000', fontStyle: '500'}}]
                    }
                }
            });
        }
        $scope.updateTrends("United States",$scope.type);
        $scope.updatePlaceHolder();
        $scope.updateOptions();
        // console.log($scope.trends);
    }
]);