'use strict';

/* Controllers */

angular.module('app', ['ui.select'])
    .controller('ChallengeCtrl', ['$scope', function($scope) {
        var challengeStatusDict={0:"Open",1:"In Progress",2:"Finished",3:"Failed",4:"Canceled",5:"Pending"};
        $scope.challengeType={1:"Sell"};
        $scope.challengeProduct={1:"Samsung Galaxy 7", 2:"Xiaomi Mi5 32GB",3:"Sony Xperia XA1 Dual",4:"LG X cam",5:"Samsung Galaxy J5 Prime Duos",6:"Huawei Honor 8 Lite",7:"Vertex Impress Eagle",8:"Apple iPhone SE 32GB"};
        $scope.challengeTarget={1:"Daria Minina",2:"Grigory Movsesyan",3:"Anastasia Sorokina",4:"Dmitry Nikolaev"}

        $scope.newChallenge = {};

        $scope.getStatus=function(status){return challengeStatusDict[status];};

        $scope.getTitle=function(type, amount, product){return $scope.challengeType[type] + ' ' + amount + ' of ' + $scope.challengeProduct[product];};

        $scope.challengeData = [
            {
                "type": 1,
                "amount": 5,
                "product": 3,
                "progress": 75,
                "expires": 1499697164,
                "status": 1
            },
            {
                "type": 1,
                "amount": 10,
                "product": 2,
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
                "product": 4,
                "progress": 50,
                "expires": 1499786564,
                "status": 4
            },
            {
                "type": 1,
                "amount": 5,
                "product": 5,
                "progress": 0,
                "expires": 1499786564,
                "status": 0
            },
            {
                "type": 1,
                "amount": 7,
                "product": 6,
                "progress": 80,
                "expires": 1499786564,
                "status": 0
            },
            {
                "type": 1,
                "amount": 3,
                "product": 7,
                "progress": 50,
                "expires": 1499786564,
                "status": 0
            },
            {
                "type": 1,
                "amount": 10,
                "product": 8,
                "progress": 50,
                "expires": 1499786564,
                "status": 0
            }];

        $scope.createChallenge = function(){ 
            $scope.challengeData.unshift({
                "type": $scope.newChallenge.challengeType.id,
                "amount": $scope.newChallenge.productAmount,
                "product": $scope.newChallenge.productType.id,
                "progress": 0,
                "expires": new Date($scope.newChallenge.endDate).getTime()/1000,
                "status": 5
            });
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
