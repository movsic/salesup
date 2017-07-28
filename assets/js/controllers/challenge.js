'use strict';

/* Controllers */

angular.module('app', ['ui.select'])
    .controller('ChallengeCtrl', ['$scope', '$translate', 'StorageService', function($scope, $translate, StorageService) {

        $scope.challengeData = StorageService.data.challengs;

        $scope.activeTab=0;

        $scope.setActive = function(id){
            $scope.activeTab=id;
        };

        $scope.getChallengeTypes = function(){
            return DataProviderService.getChallengeTypeData();
        };

        $scope.findProduct = function(name){
            return DataProviderService.getProductData(name);
        }

        $scope.findPerson = function(name){
            return DataProviderService.getPersonData(name);
        }

        $('.progressr[data-toggle="tooltip"]').tooltip({
            animated: 'fade',
            placement: 'bottom'
        });

        $scope.challengeAccept = function(id) {
            var challenge = $scope.challengeData.find(x => x.id === id);
            challenge.status = 1;
            challenge.acceptDate = new Date().getTime();
        }

        //debug
        $scope.recalcChallenges = function(){

        }

        //$scope.challengeAbort = function(id) {
        //    var challenge = $scope.challengeData.find(x => x.id === id).status=3;
        //}

        $scope.newChallenge = {};

        $scope.transleteGroup = function (item){
            return $translate.instant('ProductType' + item.type);;
        };

        $scope.createChallenge = function(form){
            //do not submit on invalid form
            if(!form.$valid){
                return; 
            }

            console.log($scope.newChallenge);

            $scope.challengeData.unshift({
                "id": $scope.challengeData.length+1,
                "type": $scope.newChallenge.challengeType.id,
                "amount": $scope.newChallenge.productAmount,
                "product": $scope.newChallenge.product.map(function (obj) {return obj.name}),
                "yourProgress": 0,
                "opponent": $scope.newChallenge.opponent.name,
                "opponentProgress": 0,
                "createDate": new Date().getTime(),
                "endDate": new Date($scope.newChallenge.endDate).getTime()/1000,
                "status": 4,
                "fee": $scope.newChallenge.bid,
                "reward": {"coins":$scope.newChallenge.bid*2,"points":100}
            });

            $('#newChallengeModal').modal('hide'); 
        };

        $scope.showNewChallenge = function() {
            $scope.newChallenge={};
            $('#newChallengeModal').modal('show');   
        };

        //todo: maybe redo
        $scope.expand = function(event) {
            var element = event.currentTarget;
            if ($(element).hasClass('shown') && $(element).next().hasClass('row-details')) {
                $(element).removeClass('shown');
                $(element).next().hide();
                return;
            }
            var tr = $(element).closest('tr');

            $(element).parents('tbody').find('.shown').removeClass('shown');
            $(element).next().hide();

            tr.addClass('shown');
            $(element).next().show();
        }
    }]);