'use strict';

/* Controllers */

angular.module('app')
    .controller('AdminSalesCtrl', ['$scope', '$translate', 'DataProviderService', 'HelperService', function($scope, $translate, DataProviderService, HelperService)  {
        $scope.helper = HelperService;
        $scope.salesData = DataProviderService.getSalesData();
    }]);