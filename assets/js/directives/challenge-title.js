angular.module('app')
    .directive('challengeTitle', ['$translate', function ($translate) {
        return {
            restrict: 'E',
            scope: {
            	data: "=",
            },  
            link: function (scope, element, attrs) {
                var typeText = $translate.instant('ChallengeType' + scope.data.type);
                var productText = $translate.instant('ProductType' + scope.data.product);
                var text = $translate.instant('ChallengeTitle', { type: typeText, amount: scope.data.amount, product: productText });
                if(scope.data.opponent){
                    text+=" vs " + scope.data.opponent;
                }
            	element.text(text);
			}
        };
    }]);