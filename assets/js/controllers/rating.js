'use strict';

/* Controllers */

angular.module('app')
    .controller('RatingCtrl', ['$scope', 'DataProviderService', function($scope, DataProviderService) {
         $scope.ratingData = DataProviderService.getRatingData();

    }]);
