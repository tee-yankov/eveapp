'use strict';

/* Controllers */
angular.module('myApp.controllers', []).
  controller('ProfileCtrl', ['$scope', '$localStorage', '$filter', function($scope, $localStorage, $filter) {
    $scope.$storage = $localStorage;
    $scope.$storage.information = Object.prototype.toString.call($scope.$storage.information) == "[object Array]" ? $scope.$storage.information : [];
    $scope.information = $scope.$storage.information[0];
  $scope.$on("refresh", function(event){
    $scope.information = $scope.$storage.information[0];
  });
  $scope.resetData = function(){
    $scope.$storage.information = [];
    $scope.$emit("refresh");
  };
  }]).
  controller('ApiController', ['$scope', '$http', '$localStorage', '$filter', '$window', function($scope, $http, $localStorage, $filter, $window) {
    $scope.url = './vendor/3rdpartyeve/phealng/getCharacters.php';
    $scope.$storage = $localStorage;

    $scope.getData = function(){
      $http.post($scope.url, {"keyId" : $scope.keyId, "vCode" : $scope.vCode}).
      success(function(data, status){
        console.log($scope.keyId + " AND " + $scope.vCode);
        if ($filter('checkUnique')(data, $scope.$storage.information) === -1) {
          $scope.$storage.information.push(data);
        } else {$window.alert('Already added');}
        $scope.$emit("refresh");
        console.log($scope.$storage.information[0]);
      }).
      error(function(data, status, headers, config){
        $scope.data = data || "request failed";
        $scope.status = status;
      });
    };
  }]);


