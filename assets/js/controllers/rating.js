'use strict';

/* Controllers */

angular.module('app')
    .controller('RatingCtrl', ['$scope', '$translate', 'ActionService', function($scope, $translate, ActionService) {
        $scope.ratingData = ActionService.getStorageData('rating');

        $scope.activeTab = 0;
        $scope.groupFilter = $scope.profileData.group;
        $scope.setActive = function (id) { 
        	$scope.activeTab = id;
        	switch(id) {
			    case 0:
			        $scope.groupFilter = $scope.profileData.group;
			        break;
			    case 1:
			        $scope.groupFilter = undefined;
			        break;
			    default:
			        break;
			}
		}
    }]);
