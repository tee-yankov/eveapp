'use strict';

/* Directives */


angular.module('myApp.directives', [])
  .directive('profile', function() {
  	return {
  		restrict: 'E',
  		templateUrl: './partials/profile.html'
  	};
  })
  .directive('about', function() {
  	return {
  		restrict: 'E',
  		templateUrl: './partials/about.html'
  	};
  })
  .directive('tools', function(){
  	return {
  		restrict: 'E',
  		templateUrl: './partials/tools.html'
  	};
  })
  .directive('login', function(){
  	return {
  		restrict: 'E',
  		templateUrl: './partials/login.html'
  	};
  });