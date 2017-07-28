angular.module('app')
	.service('NotificationService', function () {
		this.showNotification = function(type, header, message, img) {
	        // Slide-in a circle notification from sides
	        // You have to provide the HTML for thumbnail 
	       	if(!img){
	       		img = type + ".png";
	       	}
	        $('body').pgNotification({
	            style: 'circle',
	            title: header,
	            message: message,
	            position: "top-right",
	            timeout: 0,
	            type: type,
	            thumbnail: `<img width="40" height="40" 
	            style="display: inline-block;" 
	            src="assets/img/profiles/`+img+`" 
	            data-src="assets/img/profiles/`+img+`" 
	            ui-jq="unveil" 
	            data-src-retina="assets/img/profiles/`+img+`" alt="">`
	        }).show();
	    }

	})