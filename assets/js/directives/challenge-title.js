angular.module('app')
    .directive('challengeTitle', ['$translate', function ($translate) {
        return {
            restrict: 'E',
            scope: {
            	type: "=",
            	amount: "=",
            	product: "=",
            },  
            link: function (scope, element, attrs) {
                var typeText = $translate.instant('ChallengeType' + scope.type);
                var productText = $translate.instant('ProductType' + scope.product);
            	element.text($translate.instant('ChallengeTitle', { type: typeText, amount: scope.amount, product: productText }));
			}
        };
    }]);