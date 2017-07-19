'use strict';

/* Controllers */

angular.module('app', ['nvd3'])
    .controller('SalesCtrl', ['$scope', 'DataProviderService', function($scope, DataProviderService) {
        var salesType={1:"Sale",2:"Return"};
        $scope.getSalesType=function(type){return salesType[type]};

        var productGroup={1:"Phones",2:"Tablets",3:"Laptops"};
        $scope.getProductGroup=function(type){return productGroup[type]};

        var currencyType={1:"RUB",2:"USD"};
        $scope.getCurrencyType=function(type){return currencyType[type]};

        var productType={1:"Samsung Galaxy 7", 2:"Xiaomi Mi5 32GB",3:"Sony Xperia XA1 Dual",4:"LG X cam",5:"Samsung Galaxy J5 Prime Duos",6:"Huawei Honor 8 Lite",7:"Vertex Impress Eagle",8:"Apple iPhone SE 32GB"};
        $scope.getProductType=function(type){return productType[type]};

        $scope.salesData = DataProviderService.getSalesData();

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
