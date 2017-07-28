angular.module('app')
	.service('ActionService', function (StorageService, DataProviderService) {

		this.loadInitData = function(){
			StorageService.data.profile = DataProviderService.getProfileData();
	    	StorageService.data.news = DataProviderService.getNewsData();
		    StorageService.data.challengs = DataProviderService.getChallengesData();
		    StorageService.data.sales = DataProviderService.getSalesAggregateData();
		}
	});