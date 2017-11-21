'use strict';

/* Controllers */

angular.module('app', ["nvd3"])
    // Chart controller 
    .controller('HomeCtrl', ['$scope', '$rootScope', '$timeout', 'ActionService', 'DataProviderService', function($scope, $rootScope, $timeout, ActionService, DataProviderService) {

    ActionService.initParallax();
    $scope.c1count=0;
    $scope.c2count=3;
    $scope.doneGame={0:true,1:true,2:false,3:false,4:false};
    renderSlider();

    $scope.new = ActionService.newChallenge;

    $scope.challengeAccepted = false;
    $scope.acceptChallenge = function(){
        $scope.challengeAccepted = true;
    }

    $scope.cancelChallenge = function(){
        $scope.challengeAccepted = false;
    }

    $scope.addSell = function(){
        ActionService.showNotification("success","your-sale", {sale:"Samsung S8", points:10});
        $scope.c1count += 1;
        changeSlider();
        if($scope.c1count == 5){
            ActionService.showModal('win', {'reward':{'coins':250,'points':10}})
        } 
    }

    $scope.incGame = function(){
        for(var i in $scope.doneGame){
            if($scope.doneGame[i] == false){
                $scope.doneGame[i] = true;
                break;
            }
        }
    }

    $scope.incPlan = function(){
        console.log($("#my_plan > .progress-circle-thick > .pie > .right-side"))
        $("#my_plan > .progress-circle-thick > .pie > .right-side").css('transform', 'rotate(90deg)');
        $("#office > .progress-circle-thick > .pie > .left-side").css('transform', 'rotate(286deg)');
        $("#services > .progress-circle-thick > .pie > .right-side").css('transform', 'rotate(160deg)');
        $("#enroll > .progress-circle-thick > .pie > .right-side").css('transform', 'rotate(145deg)');
    }

    $rootScope.$on('keypress', function (evt, obj, key) {
        $scope.$apply(function () {
            console.log("Key pressed: " + key);
            switch(key){
                case "a":
                    $scope.addSell();
                    break;
                case "p":
                    $scope.incPlan();
                    break;
                case "z":
                    $scope.incGame();
                    break;
                default:
                    console.log("No handler for key " + key);
            }
        });
    })

    function changeSlider(){
        $("#new_challenge > .irs > .irs-bar").width(Math.min($scope.c1count / 5 * 100,100) + "%");
        
    };

    function renderSlider(){
        $("#example_camp").ionRangeSlider({
                min: 0,
                max: 5,
                from: $scope.c2count,
                type: 'single',
                step: 1,
                postfix: " аб.",
                prettify_enabled: false,
                grid: true,
                disable: true
            });

        $("#example_new").ionRangeSlider({
                min: 0,
                max: 5,
                from: $scope.c1count,
                type: 'single',
                step: 1,
                postfix: " шт.",
                prettify_enabled: false,
                grid: true,
                disable: true
            });
    };


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
                "values": [[1, 0],[2, 8],[3, 20],[4, 22],[5, 30],[6, 26],[7, 10]]
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

        $scope.nvd3_sales_data = $scope.salesData;

        $scope.game = {};
        $scope.game.scale=100;
        $scope.game.show = false;
        $scope.game.anim = 0;
        $scope.game.dist = 0;
        $scope.showGame = function (){
            $scope.game.show = true;
        };
        $scope.switchStage = function () {
            if($scope.game.anim == 3){ 
                $scope.game.anim = -1;
                $scope.game.dist = 0;
            }
            $scope.game.anim += 1;
            $scope.game.dist = 15 * $scope.game.anim;
            if($scope.game.anim == 2){
                $timeout(function() { $scope.game.anim = 3;$scope.game.dist = 30;}, 800);
            }
            
        }

}]);
