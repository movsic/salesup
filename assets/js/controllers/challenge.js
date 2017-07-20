'use strict';

/* Controllers */

angular.module('app', ['ui.select'])
    .controller('ChallengeCtrl', ['$scope', 'DataProviderService', function($scope, DataProviderService) {
        var challengeStatusDict={0:"Open",1:"In Progress",2:"Finished",3:"Failed",4:"Pending"};
        $scope.challengeType={1:"Sell"};
        $scope.challengeProduct={0:"Phone", 1:"Tablet",2:"Notebook"};
        $scope.challengeTarget={1:"Daria Minina",2:"Grigory Movsesyan",3:"Anastasia Sorokina",4:"Dmitry Nikolaev"};

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

        $scope.getStatus=function(status){return challengeStatusDict[status];};

        $scope.getTitle=function(type, amount, product){return $scope.challengeType[type] + ' ' + amount + ' of ' + $scope.challengeProduct[product];};

        $scope.challengeData = DataProviderService.getChallengeData();

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