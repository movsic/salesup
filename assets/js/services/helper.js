angular.module('app')
	.service('HelperService', function () {

		this.getLevelForPoints = function (points, configData) {
            for(var i in configData.pointsToLevel){
                if(points <= configData.pointsToLevel[i]){
                    return i-1;
                }
            }
            //return Math.floor(Math.pow(points,1/3));
        }

        this.getPointsForLevel = function (level, configData) {
            return configData.pointsToLevel[level];
            //return Math.pow(level,3);
        }
	});