'use strict';

/* Controllers */
angular.module('myApp.controllers', []).
  controller('ProfileCtrl', ['$scope', '$localStorage', '$filter', function($scope, $localStorage, $filter) {
    $scope.$storage = $localStorage;
    $scope.$storage.information = Object.prototype.toString.call($scope.$storage.information) == "[object Array]" ? $scope.$storage.information : [];
    $scope.information = $scope.$storage.information;
    if ($scope.$storage.information[1] === 'undefined') {
    $scope.corpSearch = null;
    } else {$scope.corpSearch = $filter('corpSearch')($scope.$storage.information[0].corpName);}
  $scope.$on("refresh", function(event){
    $scope.information = $scope.$storage.information;
  });
  $scope.resetData = function(){
    $scope.$storage.information = [];
    $scope.$emit("refresh");
  };
  }]).
  controller('ApiController', ['$scope', '$http', '$localStorage', function($scope, $http, $localStorage) {
    $scope.url = './vendor/3rdpartyeve/phealng/index.php';
    $scope.$storage = $localStorage;

    $scope.getData = function(){
      $http.post($scope.url, {"keyId" : $scope.keyId, "vCode" : $scope.vCode}).
      success(function(data, status){
        $scope.$storage.information.push(data);
        console.log($scope.$storage.information);
        $scope.$emit("refresh");
      }).
      error(function(data, status, headers, config){
        $scope.data = data || "request failed";
        $scope.status = status;
      });
    };
  }]);