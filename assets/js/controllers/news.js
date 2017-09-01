'use strict';

/* Controllers */

angular.module('app')
    .controller('NewsCtrl', ['$scope', '$translate', 'ActionService', 'HelperService', function($scope, $translate, ActionService, HelperService)  {
        $scope.newsData = ActionService.getStorageData('news');
    }]);