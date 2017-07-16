'use strict';

/* Controllers */

angular.module('app', ['ngAnimate','ui.bootstrap'])
    .controller('ShopCtrl', ['$scope', function($scope) {
        $scope.activeItem={};
        $scope.shopData = [
            {
                "title": "Title 1",
                "img": ["1.jpg"],
                "description":"description1",
                "price": 100,
            },
            {
                "title": "Title 2",
                "img": ["2_1.jpg"],
                "promoted": true,
                "description":"description2",
                "price": 200,
            },
            {
                "title": "Title 3",
                "img": ["3.jpg"],
                "description":"description3",
                "price": 300,
            },
            {
                "title": "Title 4",
                "img": ["4.jpg"],
                "description":"description4",
                "price": 400,
            },
            {
                "title": "Title 5",
                "img": ["5.jpg"],
                "description":"description5",
                "price": 500,
            }];

        $scope.init = function() {
            $('.item-slideshow > div').each(function() {
                var img = $(this).data('image');
                $(this).css({
                    'background-image': 'url(' + img + ')',
                    'background-size': 'cover'
                })
            });
        }
        $scope.showItemDetails = function(item) {
            $scope.activeItem=item;
            var dlg = new DialogFx($('#itemDetails').get(0));
            dlg.toggle();
        }

    }]);
