'use strict';

/* Controllers */

angular.module('app')
    .controller('MainCtrl', ['$scope', '$translate', 'ActionService', 'HelperService', 'amMoment', function($scope, $translate, ActionService, HelperService, amMoment) {
    	ActionService.loadInitData();
        $scope.action = ActionService;
        $scope.helper = HelperService;

        $scope.configData = ActionService.getStorageData('config');
        $scope.profileData = ActionService.getStorageData('profile');

        $scope.getLevel = function(points){
            return HelperService.getLevelForPoints(points, $scope.configData);
        }

        $scope.updateProfileData = function (profileData, configData) {
            profileData.level = HelperService.getLevelForPoints(profileData.points, configData);
            profileData.pointsNextLevel = HelperService.getPointsForLevel(profileData.level+1, configData);
            profileData.pointsPrevLevel = HelperService.getPointsForLevel(profileData.level, configData);
        }
        $scope.updateProfileData($scope.profileData, $scope.configData);
        
        $scope.$watch(
            function () { return $scope.profileData; }, 
            function (newValue, oldValue) {
                if (oldValue.points !== newValue.points)
                    $scope.updateProfileData($scope.profileData, $scope.configData);
            },
            true
        );

    	$scope.changeLanguage = function () {
    		if($translate.use()=='en'){
				$translate.use('ru');
				moment.locale('ru');
                amMoment.changeLocale('ru');
			}else{
				$translate.use('en');
				moment.locale('en');
                amMoment.changeLocale('en');
			}
		};
    }]);