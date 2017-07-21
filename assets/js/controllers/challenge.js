'use strict';

/* Controllers */

angular.module('app', ['ui.select'])
    .controller('ChallengeCtrl', ['$scope', 'DataProviderService', function($scope, DataProviderService) {

        $scope.active=0;
        $('.progressr[data-toggle="tooltip"]').tooltip({
            animated: 'fade',
            placement: 'bottom'
        });

        $scope.challengeAccept = function(id) {
            var challenge = $scope.challengeData.find(x => x.id === id);
            challenge.status=1;
        }

        $scope.challengeAbort = function(id) {
            var challenge = $scope.challengeData.find(x => x.id === id);
            challenge.status=3;
        }

        $scope.setActive = function(id){
            $scope.active=id;
        };

        $scope.newChallenge = {};

       
        $scope.challengeData = DataProviderService.getChallengeData();
        $scope.newChallengeData = DataProviderService.getNewChallengeData();

        $scope.createChallenge = function(){ 
            $scope.challengeData.unshift({
                "id": $scope.challengeData.length+1,
                "type": $scope.newChallenge.challengeType.id,
                "amount": $scope.newChallenge.productAmount,
                "product": $scope.newChallenge.productType.id,
                "progress": 0,
                "expires": new Date($scope.newChallenge.endDate).getTime()/1000,
                "status": 5
            });
        };

        $scope.isChallengeValid = function(){ 
            return "challengeType" in $scope.newChallenge 
            && "productAmount" in $scope.newChallenge 
            && "productType" in $scope.newChallenge 
            && "endDate" in $scope.newChallenge 
            && "bid" in $scope.newChallenge;
        };

        $scope.showNewChallenge = function() {
            $scope.newChallenge={};
            var size = "default";
            var modalElem = $('#modalSlideUp');
            //TODO suppost small modals
            if (size == "mini") {
                $('#modalSlideUpSmall').modal('show')
            } else {
                $('#modalSlideUp').modal('show')
                if (size == "default") {
                    modalElem.children('.modal-dialog').removeClass('modal-lg');
                } else if (size == "full") {
                    modalElem.children('.modal-dialog').addClass('modal-lg');
                }
            }
        };

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