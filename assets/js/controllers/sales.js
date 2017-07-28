'use strict';

/* Controllers */

angular.module('app', ['nvd3'])
    .controller('SalesCtrl', ['$scope', 'ActionService', function($scope, ActionService) {

        $scope.salesData = ActionService.getStorageData('sales');
        console.log($scope.salesData)

        $scope.nvd3_options = {
            chart: {
                type: 'discreteBarChart',
                tooltips: false,
                height: 500,
                margin: {
                    left: 15
                },
                x: function(d) {
                    return d.label
                },
                y: function(d) {
                    return d.value
                },
                color: [
                    $.Pages.getColor('success', .7)

                ],
                showValues: true,
                duration: 500
            }
        };

        
        var calcTimeline = function(salesData){
            var salesKeyValue=[];
            for(var i in salesData){
                var date = moment(salesData[i].timestamp).format('L');
                salesKeyValue[date] += salesData[i].sum;
            }
            var salesArray = Object.keys(salesKeyValue).map(function(key) {
               return {label: key, value: salesKeyValue[key]};
            });
            salesArray=salesArray.sort();
            return salesArray;
        }
        

        $scope.nvd3_data = [{
                "key": "Monthly sales",
                "values": calcTimeline($scope.salesData)
            }];

        
    }]);
