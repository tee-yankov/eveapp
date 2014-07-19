'use strict';

/* Services */

angular.module('myApp.services', []).
	factory('dataService', ['$resource', function($resource){
		return $resource('./vendor/3rdpartyeve/phealng/index.php', {}, {
			query: {method: 'GET', params:{keyId: '', vCode: ''}, isArray:true}
		});
	}]);
