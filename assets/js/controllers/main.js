'use strict';

/* Controllers */

angular.module('app')
    .controller('MainCtrl', ['$scope', '$translate', 'ActionService', 'HelperService', 'amMoment', function($scope, $translate, ActionService, HelperService, amMoment) {
        $scope.action = ActionService;
        $scope.helper = HelperService;

        $scope.action.loadInitData();

        $scope.configData = $scope.action.getStorageData('config');
        $scope.profileData = $scope.action.getStorageData('profile');

        $scope.getLevel = function(points){
            return $scope.helper.getLevelForPoints(points, $scope.configData);
        }

        function updateProfileData(profileData, configData) {
            profileData.level = $scope.helper.getLevelForPoints(profileData.points, configData);
            profileData.pointsNextLevel = $scope.helper.getPointsForLevel(profileData.level+1, configData);
            profileData.pointsPrevLevel = $scope.helper.getPointsForLevel(profileData.level, configData);
        }

        updateProfileData($scope.profileData, $scope.configData);
        
        $scope.$watch(
            function () { return $scope.profileData; }, 
            function (newValue, oldValue) {
                if (oldValue.points !== newValue.points)
                    updateProfileData($scope.profileData, $scope.configData);
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