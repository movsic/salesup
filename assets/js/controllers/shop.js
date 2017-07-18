'use strict';

/* Controllers */

angular.module('app')
    .controller('ShopCtrl', ['$scope', function($scope) {
        $scope.activeItem={};

        $scope.shopData = [
            {
                "title": "Iphone 7 Red",
                "img": ["iphone.jpg","1.jpg"],
                "description":"Take your iPhone experience to the next level with iPhone 7 (PRODUCT) RED Special Edition. Featuring new camera systems, a better battery-life, an efficient processor and powerful stereo speakers, this smartphone will drastically enhance your iPhone experience. With a sharp and vibrant display, and a sleek water-resistant body, this phone is as powerful as it is attractive.",
                "price": 7000,
            },
            {
                "title": "AIDA, 21.12.2017",
                "img": ["theater_570.jpg","2_1.jpg","2_2.jpg"],
                "promoted": true,
                "description":"World premiere: Cairo Opera House, 1871. This grandest of grand operas features an epic backdrop for what is in essence an intimate love story. Set in ancient Egypt, Aida never loses sight of its three protagonists: Amneris, the proud daughter of the pharaoh; her slave, Aida, who is the princess of the rival kingdom of Ethiopia; and Radamès, the Egyptian warrior they both love. Few operas have matched Aida in its exploration of the conflict of private emotion and public duty.",
                "price": 5000,
            },
            {
                "title": "Apple whatch, 38 mm, white band ",
                "img": ["watch.jpg"],
                "description":"Strap on the Apple Watch and stay connected throughout the day, always. This water-resistant smartwatch comes with a sturdy Ion-X glass display, a heart rate sensor, an accelerometer, an ambient light sensor and a gyroscope, making it perfect for both indoor and outdoor use. The built-in speaker and microphone let you conveniently make calls, right from your wrist.",
                "price": 3500,
            },
            {
                "title": "2-month fitness membership",
                "img": ["gym.jpg"],
                "description":"Kaifu Lodge is a high-end fitness center and spa with a free climbing area, squash courts, restaurant and four studios that offer over 200 courses per week. The gym has cardio machines, 70 Cybex strength training machines, a free weight area and a stretching area. The spa facilities include 2 indoor pools, one heated outdoor pool, 4 Finnish saunas, steam bath, ice room, Kneipp zone, fire place room, tanning benches and massage areas. The courses offered cover 40 different fitness/dance possibilities which include yoga, Pilates, Tai Chi etc.",
                "price": 400,
            },
            {
                "title": "Inbound Sales Certification",
                "img": ["course.jpg"],
                "description":"Inbound Sales Certification features five classes that introduce you to the Inbound Sales Methodology. From identifying potential buyers, to developing outreach strategies, to building personalized presentations, this free sales training course covers the basics of what inbound sales is all about. Whether you're leading a sales team, just getting started or you're a seasoned professional, the Inbound Sales Certification will prepare you to better identify, connect, explore, and advise today’s empowered buyer.",
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

            $('#myCarousel').carousel({});
        }
        $scope.showItemDetails = function(item) {
            $scope.activeItem=item;
            var dlg = new DialogFx($('#itemDetails').get(0));
            dlg.toggle();
        }

    }]);
