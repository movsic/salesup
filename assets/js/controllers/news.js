'use strict';

/* Controllers */

angular.module('app')
    .controller('NewsCtrl', ['$scope', 'DataProviderService', function($scope, DataProviderService)  {

        var newsType={1:"Started Challenge",2:"Won Challenge",3:"Earned Badge"};

        $scope.getType=function(type){return newsType[type]};

        $scope.newsData = DataProviderService.getNewsData();

    }]);