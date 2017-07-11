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
                "branch": "Munich",
                "img": "dasha.jpeg",
                "name": "Daria Minina",
                "type": 1,
                "result": "Hardcore Challenge"
            },
            {
                "id": 1,
                "timestamp":1499786564,
                "branch": "Moscow",
                "img": "vlad.jpeg",
                "name": "Vlad Shalaev",
                "type": 2,
                "result": "SuperSeller Challenge"
            },
            {
                "id": 1,
                "timestamp":1499786564,
                "branch": "Moscow",
                "img": "max.jpeg",
                "name": "Max Kornev",
                "type": 3,
                "result": "Super Badge"
            },
            {
                "id": 1,
                "timestamp":1499786564,
                "branch": "Munich",
                "img": "grisha.jpeg",
                "name": "Grisha Movsesyan",
                "type": 4,
                "result": "Impossible Challenge"
            }];

    }]);
