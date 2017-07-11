'use strict';

/* Controllers */

angular.module('app')
    .controller('RatingCtrl', ['$scope', function($scope) {
         $scope.ratingData = [
            {
                "pos": 1,
                "img": "dasha.jpeg",
                "name": "Daria (Mini) Minina",
                "branch": "Nomos",
                "rating": 100500
            },
            {
                "pos": 2,
                "img": "vlad.jpeg",
                "name": "Vlad (MegaMozg) Shalaev",
                "branch": "Kube Solutions",
                "rating": 100499
            },
            {
                "pos": 3,
                "img": "max.jpeg",
                "name": "Max (SuperKoder) Kornev",
                "branch": "Nomos",
                "rating": 100498
            },
            {
                "pos": 4,
                "img": "grisha.jpeg",
                "name": "Grisha (Mouse) Movsesyan",
                "branch": "Divan inc",
                "rating": 100497
            }];

    }]);
