'use strict';

/* Controllers */
angular.module('myApp.controllers', []).
  controller('ProfileCtrl', ['$scope', '$localStorage', '$filter', function($scope, $localStorage, $filter) {
    $scope.$storage = $localStorage;
    $scope.$storage.information = Object.prototype.toString.call($scope.$storage.information) == "[object Array]" ? $scope.$storage.information : [];
    $scope.information = $scope.$storage.information;
  $scope.$on("refresh", function(event){
    $scope.information = $scope.$storage.information;
  });
  $scope.resetData = function(){
    $scope.$storage.information = [];
    $scope.$emit("refresh");
  };
  }]).
  controller('ApiController', ['$scope', '$http', '$localStorage', '$filter', '$window', function($scope, $http, $localStorage, $filter, $window) {
    $scope.url = './vendor/3rdpartyeve/phealng/index.php';
    $scope.$storage = $localStorage;

    $scope.getData = function(){
      $http.post($scope.url, {"keyId" : $scope.keyId, "vCode" : $scope.vCode}).
      success(function(data, status){
        if ($filter('checkUnique')(data, $scope.$storage.information) === -1) {
          $scope.corpSearch = $filter('corpSearch')(data.corpName);
          $scope.$storage.information.push(data);
          $scope.i = $scope.$storage.information.length - 1;
          $scope.$storage.information[$scope.i].corpSearch = $scope.corpSearch;
        } else {$window.alert('Already added');}
        $scope.$emit("refresh");
      }).
      error(function(data, status, headers, config){
        $scope.data = data || "request failed";
        $scope.status = status;
      });
    };
  }]);


