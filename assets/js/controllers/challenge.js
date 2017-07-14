'use strict';

/* Controllers */

angular.module('app')
    .controller('ChallengeCtrl', ['$scope', function($scope) {
        var challengeStatusDict={0:"Open",1:"In Progress",2:"Finished",3:"Failed",4:"Canceled"};
        var challengeType={1:"Sell"};
        var challengeProduct={1:"Product"};

        $scope.newChallenge = {};

        $scope.getStatus=function(status){return challengeStatusDict[status];};

        $scope.getTitle=function(type, amount, product){return challengeType[type] + ' ' + amount + ' of ' + challengeProduct[product];};

        $scope.challengeData = [
            {
                "id": 1,
                "type": 1,
                "amount": 5,
                "product": 1,
                "progress": 75,
                "expires": 1499697164,
                "status": 1
            },
            {
                "id": 2,
                "type": 1,
                "amount": 10,
                "product": 1,
                "progress": 100,
                "expires": 1499786564,
                "status": 2
            },
            {
                "id": 3,
                "type": 1,
                "amount": 5,
                "product": 1,
                "progress": 50,
                "expires": 1499786564,
                "status": 3
            },
            {
                "id": 4,
                "type": 1,
                "amount": 5,
                "product": 1,
                "progress": 50,
                "expires": 1499786564,
                "status": 4
            },
            {
                "id": 5,
                "type": 1,
                "amount": 5,
                "product": 1,
                "progress": 0,
                "expires": 1499786564,
                "status": 0
            }];

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
