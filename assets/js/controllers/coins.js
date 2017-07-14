'use strict';

/* Controllers */

angular.module('app')
    .controller('CoinsCtrl', ['$scope', function($scope) {
        var coinsType={1:"Challenge Accepted", 2:"Challenge Won", 3:"Sale"};
        $scope.getCoinsType=function(type){return coinsType[type]};

        $scope.coinsData = [
            {
                "type":2,
                "sum": 50,
                "timestamp": 1499686564
            },
            {
                "type":1,
                "sum": -5,
                "timestamp": 1499686564
            },
            {
                "type":3,
                "sum": 10,
                "timestamp": 1499686564
            }];
    }]);
