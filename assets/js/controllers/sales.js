'use strict';

/* Controllers */

angular.module('app', ['nvd3'])
    .controller('SalesCtrl', ['$scope', function($scope) {
        var salesType={1:"Sale",2:"Return"};
        $scope.getSalesType=function(type){return salesType[type]};

        var currencyType={1:"RUB",2:"USD"};
        $scope.getCurrencyType=function(type){return currencyType[type]};

        var productType={1:"Product1",2:"Product2"};
        $scope.getProductType=function(type){return productType[type]};

        $scope.salesData = [
            {
                "id": 1,
                "product":1,
                "type": 1,
                "sum": 50,
                "cur": 1,
                "timestamp": 1499686564
            },
            {
                "id": 2,
                "product":1,
                "type": 1,
                "sum": 70,
                "cur": 1,
                "timestamp": 1499686564
            },
            {
                "id": 3,
                "product":1,
                "type": 2,
                "sum": 20,
                "cur": 1,
                "timestamp": 1499596564
            },
            {
                "id": 4,
                "product":1,
                "type": 1,
                "sum": 10,
                "cur": 1,
                "timestamp": 1498966564
            },
            {
                "id": 5,
                "product":1,
                "type": 1,
                "sum": 300,
                "cur": 1,
                "timestamp": 1497656564
            },
            {
                "id": 6,
                "product":1,
                "type": 1,
                "sum": 30,
                "cur": 1,
                "timestamp": 1495486564
            },
            {
                "id": 7,
                "product":1,
                "type": 1,
                "sum": 60,
                "cur": 1,
                "timestamp": 1492386564
            },
            {
                "id": 8,
                "product":1,
                "type": 1,
                "sum": 80,
                "cur": 1,
                "timestamp": 1499483564
            }];

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

        var calcTimeline = function(salesData){
            var salesKeyValue=[];
            for(var i in salesData){
                var date = new Date(salesData[i].timestamp*1000).setHours(0,0,0,0)/1000;
                var sum = salesData[i].sum;
                if(salesData[i].type !== 1){
                    sum = -sum;
                }
                if(date in salesKeyValue){
                    salesKeyValue[date] += sum;
                }else{
                    salesKeyValue[date] = sum;
                }
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
