'use strict';

/* Controllers */

angular.module('app')
    .controller('RatingCtrl', ['$scope', 'ActionService', function($scope, ActionService) {
        $scope.ratingData = ActionService.getStorageData('rating');
    }]);
