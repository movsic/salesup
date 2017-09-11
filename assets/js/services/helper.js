angular.module('app')
	.service('HelperService', function () {

		this.getLevelForPoints = function (points, configData) {
            for(var i in configData.pointsToLevel){
                if(points < configData.pointsToLevel[i]){
                    return Number(i);
                }
            }
            return Number(i)+1;
        }

        this.getPointsForLevel = function (level, configData) {
            return configData.pointsToLevel[level];
            //return Math.pow(level,3);
        }

        this.getPointsForChallenge = function (points, configData) {
            var level = this.getLevelForPoints(points,configData);
            return configData.pointsForChallenge[level];
            //return Math.pow(level,3);
        }

        this.getPointsForAction = function (points, configData) {
            var level = this.getLevelForPoints(points,configData);
            return configData.pointsForAction[level];
            //return Math.pow(level,3);
        }

        this.flattenArray = function(items){
            var flatArray = [];
            for (var i in items){
                flatArray.push(items[i].name);
            }
            return flatArray.join(",");
            //return items.map(function(e){return e["name"];}).join(",");
        }

        this.getChallengeFee = function(challenge, configData){
            var fee = challenge.fee || Math.ceil(challenge.reward.coins * configData.challengeFee);
            return fee;
        }

        this.getRankForBadge = function(badge, count, configData){
            for(var i in configData.badges[badge]){
                if(count <= configData.badges[badge][i]){
                    return i-1;
                }
            }
        }
	});