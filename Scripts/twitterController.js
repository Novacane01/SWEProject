angular.module('trends').controller('TwitterController',['$scope', 'Trends', '$sce',
    function($scope,Trends,$sce){
        $scope.currentLocation = 'United States';
        $scope.type = 'Country';
        $scope.currentTrend = null;
        $scope.placeholders = ['Search by Country i.e. Canada','Search by City i.e. Tokyo','Search by trend i.e. GameOfThrones'];
        $scope.updatePlaceHolder = ()=>{
            $scope.placeholder = ($scope.type=='Country')?$scope.placeholders[0]:($scope.type=='Town')?$scope.placeholders[1]:($scope.type=='Trend')?$scope.placeholders[2]:null;
        }
        $scope.charts = [];
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
                        $scope.options.forEach((element)=>{
                            if(element.name.toLowerCase()==search.toLowerCase()){
                                $scope.currentLocation = element.name;
                            }
                        });
                        console.log('Creating Graphs');
                        $scope.createGraphs();
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
        $scope.createGraphs = ()=>{
            console.log("Aw shit here we go again");
            if($scope.charts.length>0){
                for(i = 0;i<$scope.charts.length;i++){
                    $scope.charts[i].destroy();
                }
            }
            $scope.charts = [];
            const charts = ['line','bar','polarArea'];
            var trendNames = [];
            var trendData = [];
            var counter = 0;
            $scope.trending.forEach((element)=>{
                if(element.tweet_volume>0){
                    trendNames.push(element.name);
                    trendData.push(element.tweet_volume);
                }
            });
            var colours = [];
            trendNames.forEach(()=>{
                colours.push(`rgba(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},.5)`);
            });
            console.log(colours);
            for(i = 0;i<charts.length;i++){
                var ctx = document.getElementById(charts[i]+'Chart').getContext('2d');
                $scope.charts.push(new Chart(ctx, {
                  // The type of chart we want to create
                  type: charts[i],
                  // The data for our dataset
                  data: {
                      labels: trendNames,
                      datasets: [{
                          label: 'Tweet Volume',
                          backgroundColor: (charts[i]=='polarArea'||charts[i]=='bar')?colours:'rgba(145, 205, 255,.5)',
                          borderColor: 'white',
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
                            bottom: 100
                            }
                        },
                        scales: {
                            yAxes: [{ticks: {fontSize: 12, fontFamily: "'Montserrat', sans-serif", fontColor: '#000', fontStyle: '500'}}],
                            xAxes: [{ticks: {fontSize: 12, fontFamily: "'Montserrat', sans-serif", fontColor: '#000', fontStyle: '500'}}]
                        }
                    }
                }));
            }
        }

        $scope.changeGraph = (type)=>{
            var tabContent = document.getElementsByClassName('tabcontent');
            var tabLinks = document.getElementsByClassName('nav-item');
            for(i=0;i<tabContent.length;i++){
                console.log(tabContent[i]);
                if(tabContent[i].lastElementChild.id!==type+'Chart'){
                    tabContent[i].className = tabContent[i].className.replace(' fdin',' fdout');
                }
                else{
                    tabContent[i].className = tabContent[i].className.replace(' fdout',' fdin');
                }
            }
            for(i=0;i<tabLinks.length;i++){
                tabLinks[i].className = tabLinks[i].className.replace(' active','');
            }
            document.getElementById(type).className += ' active';
            
        }
        $scope.updateTrends($scope.currentLocation,$scope.type);
        $scope.updatePlaceHolder();
        $scope.updateOptions();
        // console.log($scope.trends);
    }
]);