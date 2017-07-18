angular.module('app')
    .directive('userPic', function () {
        return {
            restrict: 'E',  
            transclude: true,
            scope: {}, 
            template: "<div></div>",       
            link: function (scope, element, attrs) {
                
                var newElement = angular.element('<div class="cs-wrapper"></div>');
                element.wrap($compile(newElement)(scope));
                new SelectFx(element[0]);
            }
        };
    });