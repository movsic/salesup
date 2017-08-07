angular.module('app')
	.service('ActionService', function (StorageService, DataProviderService, NotificationService) {
		this.getStorageData = function(id){
			return StorageService.get(id);
		}

		this.loadInitData = function(){
			StorageService.set('profile',DataProviderService.getProfileData());
	    	StorageService.set('news',DataProviderService.getNewsData());
		    StorageService.set('challenges',DataProviderService.getChallengesData());
		    StorageService.set('sales',DataProviderService.getSalesData());
		};

		this.getChallengeTypeData = function(){return DataProviderService.getChallengeTypeData();};
		this.getProductData = function(name){return DataProviderService.getProductData(name);};
		this.getPersonData = function(name){return DataProviderService.getPersonData(name);};

		this.acceptChallenge = function(item){ 
			this.updateStorage(DataProviderService.acceptChallenge(item));
			
		};

		this.addSale = function(){
			this.updateStorage(DataProviderService.addSale());
		}

		this.updateStorage = function(response) {
			console.log(response);
			if(response.error){
				this.showNotification("error", "Error", response.text);
				throw "Error " + response.error + " " + response.text;
			}
			if(response.notifications){
				for(var i in response.notifications){
					var noti = response.notifications[i];
					this.showNotification(noti.type, noti.header, noti.text);
				}
			}
			StorageService.apply(response.data);
		};

		this.showNotification = function(type, header, text, img){
			NotificationService.showNotification(type, header, text, img);
		}

	});