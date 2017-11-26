'use strict';

/* Controllers */

angular.module('app')
    .controller('NewsCtrl', ['$scope', function($scope)  {
        $scope.newsData = $scope.action.getStorageData('news');
    }]);