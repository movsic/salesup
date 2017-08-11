angular.module('app')
	.service('NotificationService', function ($uibModal, $translate) {
		this.showNotification = function(type, text, params) {
	        // Slide-in a circle notification from sides
	        // You have to provide the HTML for thumbnail 
	       	if(!params.img){
	       		params.img = type + ".png";
	       	}
	        $('body').pgNotification({
	            style: 'circle',
	            title: $translate.instant('notification-' + text + '-header', { "params": params }),
	            message: $translate.instant('notification-' + text + '-text', { "params": params }),
	            position: "top-right",
	            type: type,
	            timeout: 5000,
	            thumbnail: `<img width="40" height="40" 
	            style="display: inline-block;" 
	            src="assets/img/profiles/`+params.img+`" 
	            data-src="assets/img/profiles/`+params.img+`" 
	            ui-jq="unveil" 
	            data-src-retina="assets/img/profiles/`+params.img+`" alt="">`
	        }).show();
	    }

	    this.showModal = function(type, event) {
	    	var modalInstance = $uibModal.open({
    			templateUrl: 'tpl/blocks/modal_' + type + '.html',
		      	openedClass: 'fill-in-modal',
		      	windowClass: 'fill-in show',
		      	backdrop: 'static',
		      	keyboard  : false,
		      	controller: ['$scope', '$uibModalInstance', 'params', 
		      		function ($scope, $uibModalInstance, params) {
		      			$scope.params = params;
		      			$scope.ok = function () {
    						$uibModalInstance.close();
  						};
  					}
  				],
		      	resolve: {
			        params: function () {
			        	return event;
			        }
		    	},
		  	})
		  	modalInstance.result.then(function (){console.log('REWARD')});
        }
	})