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
		    StorageService.set('config',DataProviderService.getConfigData());
		    //add yourself to rating
		    this.getStorageData('rating').push(this.getStorageData('profile'));
		    this.updateStorage(DataProviderService.getNotifications());
		};

		//this.getChallengeTypeData = function(){return DataProviderService.getChallengeTypeData();};
		//this.getProductData = function(name){return DataProviderService.getProductData(name);};
		//this.getPersonData = function(name){return DataProviderService.getPersonData(name);};

		this.acceptChallenge = function(user, item){ 
			this.updateStorage(DataProviderService.acceptChallenge(user.id, item.id));
			
		};

		this.addSale = function(id){
			this.updateStorage(DataProviderService.addSale(id));
		}

		this.updateStorage = function(response) {
			console.log(response);
			//apply all errors!
			for(var i in response){
				switch(response[i].type){
					case "error":
						this.showNotification("error", "error-"+response[i].data.text);
						throw "Error " + response[i].data.text;
						break;
					case "modal":
						var modal = response[i].data;
						this.showModal(modal.type, modal.event);
						//TODO and wait for conformation!
						break;
					case "notification":
						var notification = response[i].data;
						this.showNotification(notification.type, "notification-"+notification.text, notification.params);
						break;
					case "update":
						var update = response[i].data;
						StorageService.apply(update);
						break;
					default:
						throw "Error update type " + response[i].type;
				}
			}
		};

		this.showNotification = function(type, header, text, img){
			NotificationService.showNotification(type, header, text, img);
		}
		this.showModal = function(type, event){
			NotificationService.showModal(type, event);
		}

	});