'use strict';

/* Controllers */

angular.module('app', ['nvd3'])
    .controller('CoinsCtrl', ['$scope', 'DataProviderService', function($scope, DataProviderService) {
        var coinsType={1:"Challenge Accepted", 2:"Challenge Won", 3:"Sale"};
        $scope.getCoinsType=function(type){return coinsType[type]};

        $scope.coinsData = DataProviderService.getCoinsData();

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

        var calcTimeline = function(data){
            var dataKeyValue=[];
            for(var i in data){
                var date = new Date(data[i].timestamp*1000).setHours(0,0,0,0)/1000;
                var sum = data[i].sum;
                if(date in dataKeyValue){
                    dataKeyValue[date] += sum;
                }else{
                    dataKeyValue[date] = sum;
                }
            }
            var dataArray = Object.keys(dataKeyValue).map(function(key) {
               return {label: key, value: dataKeyValue[key]};
            });
            return dataArray.sort();
        }

        $scope.nvd3_data = [{
                "key": "Coins",
                "values": calcTimeline($scope.coinsData)
            }];
    }]);
