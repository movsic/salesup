'use strict';

/* Controllers */

angular.module('app')
    .controller('AdminChallengesCtrl', ['$scope', '$translate', 'DataProviderService', 'HelperService', function($scope, $translate, DataProviderService, HelperService)  {
        $scope.helper = HelperService;
        $scope.challengeData = DataProviderService.getChallengesData();

        $scope.showDetails = -1;
        $scope.expand = function(id) {
            if ($scope.showDetails == id)
                $scope.showDetails = -1;
            else
                $scope.showDetails = id; 
        }
    }]);