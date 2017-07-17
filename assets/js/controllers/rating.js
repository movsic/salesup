'use strict';

/* Controllers */

angular.module('app')
    .controller('RatingCtrl', ['$scope', function($scope) {
         $scope.ratingData = [
            
            {
                "pos": 11,
                "img": "vlad.jpeg",
                "name": "Dmitry (MegaMozg) Nikolaev",
                "branch": "Universitet",
                "rating": 14320
            },
            {
                "pos": 12,
                "img": "dasha.jpeg",
                "name": "Daria (Mini) Minina",
                "branch": "Strogino",
                "rating": 12560
            },
            {
                "pos": 13,
                "img": "max.jpeg",
                "name": "Alexandr(SuperKoder) Sorokin",
                "branch": "Kievskaya",
                "rating": 12450
            },
            {
                "pos": 14,
                "img": "grisha.jpeg",
                "name": "Grisha (Mouse) Movsesyan",
                "branch": "Kievskaya",
                "rating": 10020
            }];

    }]);
