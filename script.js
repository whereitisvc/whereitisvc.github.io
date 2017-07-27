var app = angular.module("wikiViewer",[]);

app.controller("MainCtrl", function($scope, $http, $sce){
  $scope.searchTxt = "lakers";
  $scope.searchHist = [];
  $scope.list = [];
  $scope.hist = [];
  
  $scope.action = function(i){
    console.log(i);
    $scope.searchTxt = $scope.hist[i];
    $scope.hist.splice(i,1);
  }
  
  $scope.getRand = function(){
    window.open("https://en.wikipedia.org/wiki/Special:Random");
  }
  
  $scope.search = function(){
    $scope.list = [];
    if($scope.hist.length == 5) $scope.hist.splice(0,1);
    $scope.hist.push($scope.searchTxt);
    
    var url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&piprop=original&gsrsearch=';
    
    url = url + $scope.searchTxt;

    url = $sce.trustAsResourceUrl(url);

    $http.jsonp(url, {jsonpCallbackParam: 'callback'}).then(function(response){
      //$scope.results = response.data.query.pages;
      console.log("success");
      //console.log(response.data.query.pages);
      var page = response.data.query.pages;
      var reader = 'https://en.wikipedia.org/?curid=';
      angular.forEach(page, function(value,key){
        
        var img_link;
        if(value.thumbnail== null) img_link = "http://cdn.downdetector.com/static/uploads/c/300/ca3e1/wikipedia-logo_1.png";
        else img_link = value.thumbnail.original;
        
        $scope.list.push( {title:value.title, extract:value.extract, link:reader+value.pageid, image:img_link} );
        //console.log(value.thumbnail);
      });
      
    })
    
    
  };
  $scope.search();
});