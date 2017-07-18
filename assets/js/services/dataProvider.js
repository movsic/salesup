angular.module('app')
	.service('DataProviderService', function () {
	    this.data = function () { return "Data from Service!"};
	});