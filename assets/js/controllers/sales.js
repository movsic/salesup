'use strict';

/* Controllers */

angular.module('app', ['nvd3'])
    .controller('SalesCtrl', ['$scope', '$translate', 'ActionService', function($scope, $translate, ActionService) {

        $scope.salesData = ActionService.getStorageData('sales');
        
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
        
        $scope.nvd3format = function(data){
            var dataArray = [];
            var nvd3array = [];
            var timePeriod = 7;
            for(var i in data){
                if(!(data[i].product.type in dataArray)){
                    dataArray[data[i].product.type] = [];
                    for(var d = 0; d < timePeriod; d++){
                        var day = moment().subtract(d,'days').format("DD.MM.YYYY");
                        dataArray[data[i].product.type][day] = 0;
                    }
                }
                var time = moment(data[i].timestamp*1000).format("DD.MM.YYYY");
                dataArray[data[i].product.type][time] += data[i].product.price;
            }
            for(var i in dataArray){

                var ordered = {};
                Object.keys(dataArray[i]).reverse().forEach(function(key) {ordered[key] = dataArray[i][key];});

                var values = Object.keys(ordered).map(function(key) {return {x: key, y: ordered[key]};});
                nvd3array.push({"key":$translate.instant(i),"values":values});
            }
            return nvd3array;
        }

        $scope.$watch(
            function () {
                return $scope.salesData;
            }, 
            function (newValue, oldValue) {
                if (!angular.equals(oldValue.length, newValue.length)) {
                    $scope.nvd3_data = $scope.nvd3format($scope.salesData);
                }
            },
            true);

        $scope.nvd3_data = $scope.nvd3format($scope.salesData);

        $scope.nvd3_options = {
            chart: {
                type: 'multiBarChart',
                tooltips: false,
                stacked: true,
                showControls: false,
                height: 400,
                reduceXTicks: false,
                refreshDataOnly: true,
                deepWatchData: true,
                x: function(d) { return d.x },
                y: function(d) { return d.y },
                color: [
                    $.Pages.getColor('success', .7),
                    $.Pages.getColor('danger', .7),
                    $.Pages.getColor('warning', .7)
                ],
                showValues: true,
                duration: 500,
                xAxis: {
                    tickFormat: function(d) {
                        return d;
                    }
                },
                yAxis: {
                    tickFormat: d3.format('d')
                }
            }
        };

        
    }]);
