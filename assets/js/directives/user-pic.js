angular.module('app')
    .directive('userPic', function () {
        return {
            restrict: 'E',  
            transclude: false,
            template: function(elem, attr) {
                size=32
                if(attr.size=="big"){
                    size=48;
                }
                return `<span class="thumbnail-wrapper d` + size + ` circular inline m-t-5">
                    <img ng-src="assets/img/profiles/` + attr.data + `" 
                    alt="" 
                    ng-data-src="assets/img/profiles/` + attr.data + `" 
                    ui-jq="unveil" ng-data-src-retina="assets/img/profiles/` + attr.data + `" 
                    width="32" height="32">
                </span>`;       
            }
        };
    });