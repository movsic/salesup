'use strict';

angular.module('app')
    .controller('ProfileCtrl', ['$scope', 'ActionService', 'HelperService', function($scope, ActionService, HelperService) {
        $scope.profileData = ActionService.getStorageData('profile');
        $scope.getRankForBadge = function(name, value){
            return HelperService.getRankForBadge(name, value, $scope.configData);
        }
    }]);