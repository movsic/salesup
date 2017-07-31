'use strict';

/* Controllers */

angular.module('app')
    .controller('MainCtrl', ['$scope', '$translate', 'ActionService', function($scope, $translate, ActionService) {
    	ActionService.loadInitData();

    	$scope.profileData = ActionService.getStorageData('profile');
    	$scope.showNotification = ActionService.showNotification;

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
    			console.log(moment(datetime).unix());
    			return moment(datetime).unix();
	    	}else{
	    		//d.MM.yy 'at' H:mm
	    		return moment(datetime).format("DD.MM.YYYY H:mm");
	    	}
    	};

	    $scope.showModal = function() {
            $('#modalFillIn').modal('show');
            // Only for fillin modals so that the backdrop action is still there
            $('#modalFillIn').on('show.bs.modal', function(e) {
                $('body').addClass('fill-in-modal');
            })
            $('#modalFillIn').on('hidden.bs.modal', function(e) {
                $('body').removeClass('fill-in-modal');
            })

        }

    }]);