'use strict';

/* Controllers */

angular.module('app')
    .controller('MainCtrl', ['$scope', '$translate', 'DataProviderService',  function($scope, $translate, DataProviderService) {

    	//recieve all data
    	$scope.profileData = DataProviderService.getProfileData();
    	$scope.newsData = DataProviderService.getNewsData();
	    $scope.challengeData = DataProviderService.getChallengeData();
	    $scope.salesData = DataProviderService.getSalesAggregateData();

	    //todo: remove debug
	    $scope.addSale = function (){
	    	var newSale={
	    		"product":1,
                "type": 1,
                "sum": 650,
                "timestamp": 1499686564
	    	};
	    	$scope.salesData.push(newSale);
	    };

    	$scope.formatDate = function (datetime, format){
    		if(Number.isInteger(datetime)){
	    		//if timestamp is before 01.01.2017 -> seems it is im secs and we need to convert it to ms
	    		datetime = datetime<99999999999 ? datetime*1000 : datetime;
	    	}
	    	if(format=="fromNow"){
    			return  moment(datetime).fromNow();
	    	}else{
	    		//d.MM.yy 'at' H:mm
	    		return  moment(datetime).format("DD.MM.YYYY [at] H:mm");
	    	}
    	};

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
	            thumbnail: `<img width="40" height="40" 
	            style="display: inline-block;" 
	            src="assets/img/profiles/`+img+`" 
	            data-src="assets/img/profiles/`+img+`" 
	            ui-jq="unveil" 
	            data-src-retina="assets/img/profiles/`+img+`" alt="">`
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