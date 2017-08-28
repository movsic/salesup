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
		    StorageService.set('rating',DataProviderService.getRatingData());
		    //add yourself to rating
		    this.getStorageData('rating').push(this.getStorageData('profile'));
		    this.updateStorage(DataProviderService.getNotifications());
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

		this.addOpponentSale = function(){
			this.updateStorage(DataProviderService.addOpponentSale());
		}

		this.updateStorage = function(response) {
			console.log(response);
			//first show error if any
			if(response.error){
				this.showNotification("error", response.text);
				throw "Error " + response.text;
			}
			//next it's time for notifications
			if(response.notifications){
				for(var i in response.notifications){
					var notification = response.notifications[i];
					this.showNotification(notification.type, notification.text, notification.params);
				}
			}
			if(response.modals){
				for(var i in response.modals){
					var modal = response.modals[i];
					this.showModal(modal.type, modal.event);
				}
			}
			//and now let's apply changed to model data
			StorageService.apply(response.data);
		};

		this.showNotification = function(type, header, text, img){
			NotificationService.showNotification(type, header, text, img);
		}
		this.showModal = function(type, event){
			NotificationService.showModal(type, event);
		}

	});