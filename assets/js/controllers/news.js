'use strict';

/* Controllers */

angular.module('app')
    .controller('NewsCtrl', ['$scope', '$translate', 'ActionService', function($scope, $translate, ActionService)  {
        $scope.newsData = ActionService.getStorageData('news');
        $scope.getProductNames = function(products){
        	return products.map(function(e){return e.name;}).join(",");
        }
    }]);