'use strict';

/* Controllers */

angular.module('app')

    .controller('MainCtrl', ['$scope', 'DataProviderService', function($scope, DataProviderService) {

    	$scope.profileData = DataProviderService.getProfileData();

    	$scope.showNotification = function(name, img, message) {
	        var color = "success"; // Info, Success, Error etc
	        var position = "top-right" // Placement of the notification

	        // Slide-in a circle notification from sides
	        // You have to provide the HTML for thumbnail 
	        $('body').pgNotification({
	            style: 'circle',
	            title: name,
	            message: message,
	            position: position,
	            timeout: 0,
	            type: color,
	            thumbnail: '<img width="40" height="40" style="display: inline-block;" src="assets/img/profiles/' + img + '" data-src="assets/img/profiles/avatar.jpg" ui-jq="unveil" data-src-retina="assets/img/profiles/avatar2x.jpg" alt="">'
	        }).show();
	    }

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