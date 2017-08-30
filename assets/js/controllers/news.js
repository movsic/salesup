'use strict';

/* Controllers */

angular.module('app')
    .controller('NewsCtrl', ['$scope', '$translate', 'ActionService', function($scope, $translate, ActionService)  {
        $scope.newsData = ActionService.getStorageData('news');

    }]);