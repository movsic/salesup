'use strict';

/* Controllers */

angular.module('app', ["nvd3"])
    // Chart controller 
    .controller('HomeCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {

    $scope.dashboardData = {
        "profile":{
            "coins":1988,
            "coinsChange":5,
            "badges":[
                {"type": 1, "timestamp": 1499697164},
                {"type": 2, "timestamp": 1499697164},
                {"type": 3, "timestamp": 1499697164},
                {"type": 4, "timestamp": 1499697164},
            ]
        },
        "news":[
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
                "id": 2,
                "timestamp":1499786564,
                "branch": "Universitet",
                "img": "vlad.jpeg",
                "name": "Dmitry Nikolaev",
                "type": 2,
                "result": "Sell 5 of Samsung Galaxy 7"
            },
            {
                "id": 3,
                "timestamp":1499786564,
                "branch": "Kievskaya",
                "img": "max.jpeg",
                "name": "Alexandr Sorokin",
                "type": 3,
                "result": "Best agent today!"
            }
        ],
        "rating":{
            "points":12560,
            "ratingChange":5,
            "level":25,
            "nextLevel":13000,
            "prevLevel":10000,
            "position":13,
            "totalPositions":1256,
            "ratingPoints":[
                [1, 0],
                [2, 8],
                [3, 20],
                [4, 22],
                [5, 30],
                [6, 26],
                [7, 10]
            ]
        },
        "challenges":[
            {
                "id": 1,
                "type": 1,
                "amount": 5,
                "product": 3,
                "progress": 75,
                "expires": 1499697164,
                "status": 1
            },
            {
                "id": 2,
                "type": 1,
                "amount": 7,
                "product": 5,
                "progress": 80,
                "expires": 1499786564,
                "status": 2
            },
            {
                "id": 3,
                "type": 1,
                "amount": 3,
                "product": 7,
                "progress": 50,
                "expires": 1499786564,
                "status": 3
            },
            {
                "id": 4,
                "type": 1,
                "amount": 10,
                "product": 8,
                "progress": 50,
                "expires": 1499786564,
                "status": 4
            }
        ],
        "sales":[
            {
                "key":"phones",
                "values":[
                    {
                        "label":1499130000,"value":10
                    },
                    {
                        "label":1499214600,"value":20
                    },
                    {
                        "label":1499299200,"value":40
                    },
                    {
                        "label":1499385600,"value":80
                    },
                    {
                        "label":1499472000,"value":160
                    },
                    {
                        "label":1499558400,"value":320
                    },
                    {
                        "label":1499644800,"value":640
                    },
                ],
            },
            {
                "key":"tablets",
                "values":[
                    {
                        "label":1499130000,"value":10
                    },
                    {
                        "label":1499214600,"value":20
                    },
                    {
                        "label":1499299200,"value":40
                    },
                    {
                        "label":1499385600,"value":80
                    },
                    {
                        "label":1499472000,"value":160
                    },
                    {
                        "label":1499558400,"value":320
                    },
                    {
                        "label":1499644800,"value":640
                    },
                ]
            },
            {
                "key":"laptops",
                "values":[
                    {
                        "label":1499130000,"value":10
                    },
                    {
                        "label":1499214600,"value":20
                    },
                    {
                        "label":1499299200,"value":40
                    },
                    {
                        "label":1499385600,"value":80
                    },
                    {
                        "label":1499472000,"value":160
                    },
                    {
                        "label":1499558400,"value":320
                    },
                    {
                        "label":1499644800,"value":640
                    },
                ]
            }
        ]
    };  

    var testStackBar = [
           {
              "values":[
                 {
                    "label":4,
                    "x":1499130000
                 },
                 {
                    "y":5,
                    "x":1499214600
                 },
                 {
                    "y":6,
                    "x":1499299200
                 }
              ],
              "key":"Product1"
           },
           {
              "values":[
                 {
                    "y":1,
                    "x":1499130000
                 },
                 {
                    "y":2,
                    "x":1499214600
                 },
                 {
                    "y":3,
                    "x":1499299200
                 }
              ],
              "key":"Product2"
           }
        ];

    var badgeData = {
                "1":{
                        "name":"fire",
                        "title":"Hot sales!",
                        "description":"You made 10 sales the last 3 hours! Keep going!"
                    },
                "2":{
                        "name":"calendar",
                        "title":"7 days of sales growth up!",
                        "description":"Your sales results are growing the last 7 days!"
                    },
                "3":{
                        "name":"star3",
                        "title":"Best agent today!",
                        "description":"We're happy to see you in our team!"
                    },
                "4":{
                        "name":"ok",
                        "title":"Daily sales plan!",
                        "description":"You're in Top 5% agents who reached daily plan before others!"
                    },
            };
        $scope.getBadgeDescription = function(type){ return badgeData[type].title + ' ' + badgeData[type].description;};
        $scope.getBadgeName = function(type){ return badgeData[type].name;};

        var newsType={1:"Started Challenge",2:"Won Challenge",3:"Earned Badge",4:"Canceled Challenge"};
        $scope.getNewsType=function(type){return newsType[type]};

        var challengeStatusDict={0:"Open",1:"In Progress",2:"Finished",3:"Failed",4:"Canceled"};
        var challengeType={1:"Sell"};
        var challengeProduct={1:"Samsung Galaxy 7", 2:"Xiaomi Mi5 32GB",3:"Sony Xperia XA1 Dual",4:"LG X cam",5:"Samsung Galaxy J5 Prime",6:"Huawei Honor 8 Lite",7:"Vertex Impress Eagle",8:"Apple iPhone SE 32GB"};

        $scope.getChallengeStatus=function(status){return challengeStatusDict[status];};

        $scope.getChallengeTitle=function(type, amount, product){return challengeType[type] + ' ' + amount + ' of ' + challengeProduct[product];};

        $scope.getLevelComplete=function(points,prevLevel,nextLevel){return Math.ceil((points-prevLevel)/(nextLevel-prevLevel)*100);};

        //NVD3 BLOCK
        $scope.nvd3_rating_options = {
            chart: {
                type: 'lineChart',
                x: function(d) {
                    return d[0]
                },
                y: function(d) {
                    return d[1]
                },
                margin: {
                    top: 10,
                    right: -10,
                    bottom: -13,
                    left: -10
                },
                color: [
                    '#000'

                ],
                showXAxis: false,
                showYAxis: false,
                showLegend: false,
                useInteractiveGuideline: false
            }
        };

        $scope.nvd3_rating_data =  [{
                "key": "Rating changes",
                "values": $scope.dashboardData.rating.ratingPoints
            }];

        $scope.nvd3_sales_options = {
            chart: {
                type: 'multiBarChart',
                tooltips: false,
                stacked: true,
                showControls: false,
                height: 310,
                reduceXTicks: false,
                margin: {
                    left: 25
                },
                x: function(d) {
                    return d.label
                },
                y: function(d) {
                    return d.value
                },
                color: [
                    $.Pages.getColor('success', .7),
                    $.Pages.getColor('danger', .7),
                    $.Pages.getColor('warning', .7)
                ],
                showValues: true,
                duration: 500,
                xAxis: {
                    tickFormat: function(d) {
                        return d3.time.format('%d.%m.%Y')(new Date(d*1000))
                    }
                },
                yAxis: {
                    tickFormat: d3.format('d')
                }
            }
        };

        $scope.nvd3_sales_data = $scope.dashboardData.sales;
}]);
