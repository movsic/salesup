'use strict';

/* Controllers */

angular.module('app')
    .controller('ProfileCtrl', ['$scope', 'DataProviderService', function($scope, DataProviderService) {
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

        $scope.profileData = DataProviderService.getProfileData();
    }]);
