'use strict';

/* Controllers */

angular.module('app')
    .controller('MainCtrl', ['$scope', '$translate', 'ActionService', 'HelperService', function($scope, $translate, ActionService, HelperService) {
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
			}else{
				$translate.use('en');
				moment.locale('en');
			}
		};

    	$scope.formatDate = function (datetime, format){
    		if(Number.isInteger(datetime)){
	    		//if timestamp is before 01.01.2017 -> seems it is im secs and we need to convert it to ms
	    		datetime = datetime < 99999999999 ? datetime * 1000 : datetime;
	    	}
	    	if(format=="fromNow"){
    			return moment(datetime).fromNow();
    		}
    		else if(format=="timestamp"){
    			return moment(datetime).unix();
	    	}else{
	    		//d.MM.yy 'at' H:mm
	    		return moment(datetime).format("DD.MM.YYYY H:mm");
	    	}
    	};
    }]);