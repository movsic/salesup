'use strict';

/* Controllers */

angular.module('app', ['ui.select'])
    .controller('ChallengeCtrl', ['$scope', '$translate', 'ActionService', function($scope, $translate, ActionService) {

        $scope.challengeData = ActionService.getStorageData('challenges');

        $scope.activeTab=0;

        $scope.setActive = function(id){
            $scope.activeTab=id;
        };

        $scope.getChallengeTypes = function(){
            return ActionService.getChallengeTypeData();
        };

        $scope.findProduct = function(name){
            return ActionService.getProductData(name);
        }

        $scope.findPerson = function(name){
            return ActionService.getPersonData(name);
        }

        $scope.acceptChallenge = function(item) {
            ActionService.acceptChallenge(item);
        }

        $scope.newChallenge = {};

        $scope.transleteGroup = function (item){
            return $translate.instant('ProductType' + item.type);;
        };

        $scope.createChallenge = function(form){
            //do not submit on invalid form
            if(!form.$valid){
                return; 
            }

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
                "fee": $scope.newChallenge.fee,
                "reward": {"coins":$scope.newChallenge.bid*2,"points":100}
            });

            $('#newChallengeModal').modal('hide'); 
        };

        $scope.showNewChallenge = function() {
            $scope.newChallenge={};
            $('#newChallengeModal').modal('show');   
        };

        $scope.showDetails = -1;

        $scope.expand = function(id) {
            if ($scope.showDetails == id)
                $scope.showDetails = -1;
            else
                $scope.showDetails = id; 
        }
    }]);