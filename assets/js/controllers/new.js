'use strict';

/* Controllers */

angular.module('app')
    .controller('NewCtrl', ['$scope', 'ActionService', function($scope, ActionService) {
        $scope.newChallenge=ActionService.newChallenge;

        $("#example_p2p").ionRangeSlider({
            min: 0,
            max: 6,
            from: 0,
            type: 'single',
            step: 1,
            postfix: " шт.",
            prettify_enabled: false,
            grid: true
        });

        $scope.createChallenge = function () {
        	console.log($scope.newChallenge)
        }

        $scope.checkMember = function (id) {
        	for (var i in $scope.members){
        		if ($scope.members[i].id == id){
					$scope.members[i].selected = !$scope.members[i].selected;
        		}
        	}
        }

    }]).directive('ionRangeSlider', function ionRangeSlider() {
   return {
      restrict: 'A',
      scope: {
         rangeOptions: '=',
         model: '=ngModel',
         apply: '=apply'
      },
      link: function (scope, elem, attrs) {
         elem.ionRangeSlider(scope.rangeOptions);
         scope.$watch('apply',function () {
          if (scope.apply) {
            scope.apply = false;
            var slider = elem.data("ionRangeSlider");            
            slider.update({
               from: scope.model
            });
          }
         });
      }
   }
});
