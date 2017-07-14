'use strict';

/* Controllers */

angular.module('app', ['ui.select'])
    .controller('ChallengeCtrl', ['$scope', function($scope) {
        var challengeStatusDict={0:"Open",1:"In Progress",2:"Finished",3:"Failed",4:"Canceled",5:"Pending"};
        $scope.challengeType={1:"Sell"};
        $scope.challengeProduct={1:"Product"};
        $scope.challengeTarget={1:"Daria Minina",2:"Grigory Movsesyan",3:"Vlad Shalaev",4:"Max Kornev"}

        $scope.newChallenge = {};

        $scope.getStatus=function(status){return challengeStatusDict[status];};

        $scope.getTitle=function(type, amount, product){return $scope.challengeType[type] + ' ' + amount + ' of ' + $scope.challengeProduct[product];};

        $scope.challengeData = [
            {
                "type": 1,
                "amount": 5,
                "product": 1,
                "progress": 75,
                "expires": 1499697164,
                "status": 1
            },
            {
                "type": 1,
                "amount": 10,
                "product": 1,
                "progress": 100,
                "expires": 1499786564,
                "status": 2
            },
            {
                "type": 1,
                "amount": 5,
                "product": 1,
                "progress": 50,
                "expires": 1499786564,
                "status": 3
            },
            {
                "type": 1,
                "amount": 5,
                "product": 1,
                "progress": 50,
                "expires": 1499786564,
                "status": 4
            },
            {
                "type": 1,
                "amount": 5,
                "product": 1,
                "progress": 0,
                "expires": 1499786564,
                "status": 0
            }];

        $scope.createChallenge = function(){ 
            console.log($scope.newChallenge);
            $scope.challengeData.push({
                "type": $scope.newChallenge.challengeType.id,
                "amount": $scope.newChallenge.productAmount,
                "product": $scope.newChallenge.productType.id,
                "progress": 0,
                "expires": new Date($scope.newChallenge.endDate).getTime()/1000,
                "status": 5
            });
            console.log($scope.challengeData);
        };

        $scope.modal = {};
        $scope.modal.slideUp = "default";
        $scope.modal.stickUp = "default";

        $scope.showNewChallenge = function() {
            var size = $scope.modal.slideUp;
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

        var table = $('#detailedTable');
        $scope.expand = function(event) {
            var element = event.currentTarget;
            if ($(element).hasClass('shown') && $(element).next().hasClass('row-details')) {
                $(element).removeClass('shown');
                $(element).next().hide();
                return;
            }
            var tr = $(element).closest('tr');
            //var row = table.DataTable().row(tr);

            $(element).parents('tbody').find('.shown').removeClass('shown');
            $(element).next().hide();
            //$(element).parents('tbody').find('.row-details').remove();

            tr.addClass('shown');
            $(element).next().show();
            //tr.next().addClass('row-details');
        }


    }]);
