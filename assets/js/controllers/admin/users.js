'use strict';

/* Controllers */

angular.module('app')
    .controller('AdminUsersCtrl', ['$scope', 'DataProviderService', function($scope, DataProviderService)  {
    	$scope.usersData = DataProviderService.getRatingData();
    	$scope.challengesData = [];

    	$scope.showDetails = -1;
        $scope.expand = function(id) {
            if ($scope.showDetails == id){
                $scope.showDetails = -1;
            	$scope.challengesData = [];
            } else {
            	$scope.challengesData = DataProviderService.getChallengesData(id);
                $scope.showDetails = id; 
            }
        }

    }]);