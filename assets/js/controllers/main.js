'use strict';

/* Controllers */

angular.module('app')
    .controller('MainCtrl', ['$scope', '$translate', 'ActionService', 'HelperService', 'amMoment', function($scope, $translate, ActionService, HelperService, amMoment) {
    	ActionService.loadInitData();

        $scope.configData = ActionService.getStorageData('config');
        $scope.profileData = ActionService.getStorageData('profile');

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
            true);

    	$scope.showNotification = ActionService.showNotification;
    	$scope.showModal = ActionService.showModal;

    	$scope.addSale = function(){
    		ActionService.addSale();
    	};
    	$scope.addOpponentSale = function(){
    		ActionService.addOpponentSale();
    	};

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