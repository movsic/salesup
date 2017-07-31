angular.module('app')
    .directive('challengeTitle', ['$translate', function ($translate) {
        return {
            restrict: 'E',
            scope: {
            	data: "=",
            },  
            link: function (scope, element, attrs) {
                var productText = scope.data.product.map(function(v) {return $translate.instant(v);}).join();
                var text = $translate.instant('ChallengeTitle' + scope.data.type, { amount: scope.data.amount, product: productText });
                if(scope.data.opponent){
                    text+=" vs " + scope.data.opponent;
                }
            	element.text(text);
			}
        };
    }]);