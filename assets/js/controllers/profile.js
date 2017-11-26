'use strict';

angular.module('app')
    .controller('ProfileCtrl', ['$scope', function($scope) {
        $scope.profileData = $scope.action.getStorageData('profile');
        $scope.getRankForBadge = function(name, value){
            return $scope.helper.getRankForBadge(name, value, $scope.configData);
        }
    }]);