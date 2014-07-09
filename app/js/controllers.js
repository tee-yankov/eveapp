'use strict';

/* Controllers */
angular.module('myApp.controllers', [])
  .controller('ProfileCtrl', ['$scope', 'apiData', function($scope, apiData) {

  $scope.$on("refresh", function(event) {
      $scope.$safeApply();
      $scope.info = apiData.information;
      //$scope.corpSearch = $scope.info['corpName'].replace(/ /gi, '+');
  });
  }])
  .controller('ApiController', ['$scope', '$http', 'apiData', function($scope, $http, apiData) {
    $scope.url = './vendor/3rdpartyeve/phealng/index.php';

    $scope.getData = function(){
      $http.post($scope.url, {"keyId" : $scope.keyId, "vCode" : $scope.vCode})
      .success(function(data, status){
        $scope.status = status;
        $scope.data = data;
        console.log(data);
        apiData.information.push(data);
        $scope.$emit("refresh");
      })
      .error(function(data, status, headers, config){
        $scope.data = data || "request failed";
        $scope.status = status;
        console.log(data + status + headers + config);
      });
    };
  }]);