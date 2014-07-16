'use strict';

/* Filters */

angular.module('myApp.filters', []).
	filter('corpSearch', function(){
		return function(value) {
			return String(value).replace(/ /gi, '+');
		};
	}).
	 filter('checkUnique', function(){
	  	return function(data, storage) {
	  		for (var index in storage) {
	  			if(storage[index].characterID == data.characterID)
	  				return true;
	  		}
	  		return false;
	  	};
	});
