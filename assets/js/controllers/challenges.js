'use strict';

/* Controllers */

angular.module('app', ['ui.select'])
    .controller('ChallengesCtrl', ['$scope', '$translate', 'ActionService', 'HelperService', function($scope, $translate, ActionService, HelperService) {

        $scope.challengeData = ActionService.getStorageData('challenges');

        //active tab
        $scope.activeTab=0;
        $scope.setActive = function(id){
            $scope.activeTab=id;
        };

        //expand details
        $scope.showDetails = -1;
        $scope.expand = function(id) {
            if ($scope.showDetails == id)
                $scope.showDetails = -1;
            else
                $scope.showDetails = id; 
        }

        //filter
        $scope.statusFilter = function( status ) {
            return function( e ) {
                //TODO: different logic for different challenges
                return e.participants[$scope.profileData.id].status === status;
            };
        };

        $scope.getPointsForChallenge = function( points ) {
            return HelperService.getPointsForChallenge(points, $scope.configData);
        }

        $scope.getParticipants = function (challenge){
            var count = 0;
            for (var i in challenge.participants)
                if (challenge.participants[i].status == 0)
                    count++;
            return count;
            //return Object.keys(challenge.participants).length;
        }

        $scope.isRunning = function (challenge){
            return challenge.endDate > moment().unix();
        }

        $scope.getFee = function(challenge){
            return HelperService.getChallengeFee(challenge, $scope.configData)
        }

        //$scope.getChallengeTypes = function(){
        //    return ActionService.getChallengeTypeData();
        //};

        //$scope.findProduct = function(name){
        //    return ActionService.getProductData(name);
        //}

        //$scope.findPerson = function(name){
        //    return ActionService.getPersonData(name);
        //}

        //$scope.acceptChallenge = function(item) {
        //    ActionService.acceptChallenge(item);
        //}

        //$scope.newChallenge = {};

        //$scope.transleteGroup = function (item){
        //    return $translate.instant('ProductType' + item.type);
        //};

        /*
        $scope.createChallenge = function(form){
            //do not submit on invalid form
            form.$setSubmitted();
            if(!form.$valid){
                return; 
            }

            $scope.challengeData.unshift({
                "id": $scope.challengeData.length+1,
                "type": $scope.newChallenge.challengeType.id,
                "amount": $scope.newChallenge.productAmount,
                "product": $scope.newChallenge.product.map(function (obj) {return obj.name}),
                "productId": $scope.newChallenge.product.map(function (obj) {return obj.id}),
                "yourProgress": 0,
                "opponent": $scope.newChallenge.opponent.name,
                "opponentProgress": 0,
                "createDate": new Date().getTime(),
                "endDate": new Date($scope.newChallenge.endDate).getTime()/1000,
                "status": 4,
                "fee": $scope.newChallenge.fee,
                "reward": {"coins":$scope.newChallenge.fee*2,"points":100}
            });

            $('#newChallengeModal').modal('hide'); 
        };

        $scope.showNewChallenge = function() {
            $scope.newChallenge={};
            $('#newChallengeModal').modal('show');   
        };
        */
    }]);