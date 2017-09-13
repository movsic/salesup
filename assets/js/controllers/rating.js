'use strict';

/* Controllers */

angular.module('app')
    .controller('RatingCtrl', ['$scope', '$filter', '$translate', 'ActionService', function($scope, $filter, $translate, ActionService) {
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

		$scope.getPosition = function(filter){
			var filtered = $filter('filter')($scope.ratingData, filter);
			var ordered = $filter('orderBy')(filtered, '-points');
			var me = $filter('filter')(ordered, { id: $scope.profileData.id  }, true)[0];
		    var position = ordered.indexOf(me);
		    return position+1;	
		}

		$scope.getRatingCount = function(filter){
			var count = $filter('filter')($scope.ratingData, filter).length;
			return count;
		}
    }]);
