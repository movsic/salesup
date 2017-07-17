'use strict';

/* Controllers */

angular.module('app')
    .controller('NewsCtrl', ['$scope', function($scope) {

        var newsType={1:"Started Challenge",2:"Won Challenge",3:"Earned Badge",4:"Canceled Challenge"};

        $scope.getType=function(type){return newsType[type]};

         $scope.newsData = [
            {
                "id": 1,
                "timestamp":1499786564,
                "branch": "Strogino",
                "img": "dasha.jpeg",
                "name": "Daria Minina",
                "type": 1,
                "result": "Sell 5 of Sony Xperia XA1 Dual"
            },
            {
                "id": 1,
                "timestamp":1499786564,
                "branch": "Universitet",
                "img": "vlad.jpeg",
                "name": "Dmitry Nikolaev",
                "type": 2,
                "result": "Sell 5 of Samsung Galaxy 7"
            },
            {
                "id": 1,
                "timestamp":1499786564,
                "branch": "Kievskaya",
                "img": "max.jpeg",
                "name": "Alexandr Sorokin",
                "type": 3,
                "result": "Best agent today!"
            },
            {
                "id": 1,
                "timestamp":1499786564,
                "branch": "Kievskaya",
                "img": "grisha.jpeg",
                "name": "Grisha Movsesyan",
                "type": 4,
                "result": "Sell 5 of Samsung Galaxy 7"
            }];

    }]);