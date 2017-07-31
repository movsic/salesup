'use strict';

/* Controllers */

angular.module('app', ['nvd3'])
    .controller('SalesCtrl', ['$scope', 'ActionService', function($scope, ActionService) {

        $scope.salesData = ActionService.getStorageData('sales');

        $scope.nvd3_sales_data = $scope.salesData;
        
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
        
        $scope.dataPrepare = function(data){
            /*
            "type":0,
            "name":"iPhone SE",
            "sum": 600,
            "timestamp": "2017-10-13 12:00"
            */
            var formattedData = {};
            for(var i in data){
                var time = moment(data[i].timestamp).format('L');
                if(!(data[i].type in formattedData)){
                    formattedData[data[i].type] = {};
                }
                if(!(time in formattedData[data[i].type])){
                    formattedData[data[i].type][time] = data[i].sum;               
                }else{
                    formattedData[data[i].type][time] += data[i].sum;
                }
            }
            console.log(formattedData);
        }
        $scope.dataPrepare($scope.salesData);

        $scope.nvd3_data = [{
                "key": "Monthly sales",
                "values": calcTimeline($scope.salesData)
            },{

            },{

            }];

        $scope.nvd3_sales_options = {
            chart: {
                type: 'multiBarChart',
                tooltips: false,
                stacked: true,
                showControls: false,
                height: null,
                reduceXTicks: false,
                x: function(d) { return d.label },
                y: function(d) { return d.value },
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

        
    }]);
