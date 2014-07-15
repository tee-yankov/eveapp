'use strict';

/* Filters */

angular.module('myApp.filters', []).
	filter('corpSearch', function(){
		return function(value) {
			return String(value).replace(/ /gi, '+');
		};
	});

  // filter('find', function(){
  // 	return function(information, data) {
  // 		for (var index in data) {
  // 			if(data[index].characterID == information.characterID)
  // 				return index;
  // 		}
  // 		return -1;
  // 	};
  // });
