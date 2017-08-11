angular.module('app')
	.service('DataProviderService', function () {
	    this.getProfileData = function () { 
            return JSON.parse(JSON.stringify(this.updateProfile(profileData)));
        };

        this.updateProfile = function (profileData){
            profileData.level = this.getLevelForPoints(profileData.points);
            profileData.nextLevel = this.getPointsForLevel(profileData.level+1);
            profileData.prevLevel = this.getPointsForLevel(profileData.level);
            return profileData;
        };

	    this.getNewsData = function () { return JSON.parse(JSON.stringify(newsData))};

	    this.getChallengesData = function () { 
            return JSON.parse(JSON.stringify(challengeData));
        };

	    this.getSalesData = function () { 
            return JSON.parse(JSON.stringify(salesData));
        };

	    this.getSalesAggregateData = function () { return JSON.parse(JSON.stringify(salesAggregateData))};
	    this.getCoinsData = function () { return JSON.parse(JSON.stringify(coinsData))};
	    this.getRatingData = function () { return JSON.parse(JSON.stringify(ratingData))};

        this.getChallengeTypeData = function () { return challengeTypeData};
        this.getPersonData = function (name) { 
            return personData;
        };

        this.getNotifications = function() {
            //+ profileData.firstname + " " + profileData.lastname + "!",
            return {"notifications":[{
                "type":"success",
                "text":"greeting",
                "params":{"firstname":profileData.firstname,"lastname":profileData.lastname}
            }]};
        }

        this.getPointsForSell = function (level) {
            return level;
        }

        this.getPointsForChallenge = function (level) {
            return level*2;
        }

        this.getLevelForPoints = function (points) {
            return Math.floor(Math.pow(points,1/3));
        }

        this.getPointsForLevel = function (level) {
            return Math.pow(level,3);
        }

        this.getProductData = function (name) { 
            var productTypes = [];
            for(var i in productData){
                //if name in search
                if(name && name.length > 0 && productData[i].name.toLowerCase().indexOf(name.toLowerCase()) !== -1){
                    productTypes.push(productData[i]);
                //initial content - tab content - only categories
                } else if (productData[i].type == 0) {
                    productTypes.push(productData[i]);
                }
            }
            return productTypes;
        };

        this.acceptChallenge = function(challenge){
            var challenge = challengeData.find(x => x.id === challenge.id);
            if(profileData.coins < challenge.fee)
                return {"error":"ErrorNotEnoughCoins","text":"error-coins"};
            profileData.coins -= challenge.fee;
            challenge.status = 1;
            challenge.acceptDate = new Date().getTime();

            return {"data":[
                {"name":"challenges","type":"update","data":challenge},
                {"name":"profile","type":"update","data":{"key":"coins","value":profileData.coins}},
            ]};
        }

        //debug
        this.addSale = function(){
            var update = {"data":[],"notifications":[],"modals":[]};
            var newSale = {"type":"Phone","typeId":1,"name":"iPhone SE","sum": 600,"timestamp": moment().unix()};
            var lvl = profileData.level;
            salesData.push(newSale);
            profileData.points += this.getPointsForSell(profileData.level);
            update.data.push({"name":"sales","type":"add","data":newSale});
            
            update.notifications.push({"type":"success","text":"your-sell","param":{"sale":newSale.name,"points":this.getPointsForSell(profileData.level)}});
            
            for (var i in challengeData){
                if ((challengeData[i].productId.indexOf(newSale.typeId) > -1 || challengeData[i].productId.indexOf(productData[newSale.typeId].typed) > -1)
                    && challengeData[i].status == 1 && challengeData[i].type == 0){
                    challengeData[i].yourProgress += 1;
                    if (challengeData[i].yourProgress >= challengeData[i].amount){
                        challengeData[i].status = 2;
                        profileData.coins += challengeData[i].reward.coins;
                        profileData.points += challengeData[i].reward.points;
                        update.modals.push({"type":"win","event":challengeData[i]});
                    }
                    update.data.push({"name":"challenges","type":"update","data":challengeData[i]});
                }
            }

            update.data.push({"name":"profile","type":"update","data":{"key":"coins","value":profileData.coins}});
            update.data.push({"name":"profile","type":"update","data":{"key":"points","value":profileData.points}});
            var newLvl = this.updateProfile(profileData).level;
            if(lvl < newLvl){
                update.data.push({"name":"profile","type":"update","data":{"key":"level","value":profileData.level}});
                update.data.push({"name":"profile","type":"update","data":{"key":"prevLevel","value":profileData.prevLevel}});
                update.data.push({"name":"profile","type":"update","data":{"key":"nextLevel","value":profileData.nextLevel}});
                update.modals.push({"type":"levelup","event":{"level":profileData.level}});
            }

            return update;
        }

        this.addOpponentSale = function(){
            var opponentId = 1;
            var update = {"data":[],"notifications":[],"modals":[]};
            update.notifications[0]={"type":"warning","text":"opponent-sale"};
            for (var i in challengeData){
                if (challengeData[i].opponentId == opponentId && challengeData[i].status == 1 && challengeData[i].type == 0){
                    challengeData[i].opponentProgress += 1;
                    if (challengeData[i].opponentProgress >= challengeData[i].amount){
                        challengeData[i].status = 2;
                        update.notifications[0]={"type":"error","text":"challenge-loss"};
                    }
                    update.data.push({"name":"challenges","type":"update","data":challengeData[i]});
                }
            }
            return update;
        }

        //block of debug data!
	    var productData = [
            {"id":0, "name":"Anything", "type":0},
            {"id":1, "name":"Phone", "type":0},
            {"id":2, "name":"Tablet", "type":0},
            {"id":3, "name":"Notebook", "type":0},
            {"id":4, "name":"iPhone SE", "type":1},
            {"id":5, "name":"iPhone 6S", "type":1},
            {"id":6, "name":"iPhone 7", "type":1},
            {"id":7, "name":"iPad Pro", "type":2},
            {"id":8, "name":"iPad", "type":2},
            {"id":9, "name":"iPad Mini", "type":2},
            {"id":10, "name":"Macbook", "type":3},
            {"id":11, "name":"Macbook Air", "type":3},
            {"id":12, "name":"Macbook Pro", "type":3},
        ];

        var personData = [
            {"id":0,"name":"Scott Pilgrim","img":"1.jpg"},
            {"id":1,"name":"Ramona Flowers","img":"2.jpg"},
            {"id":2,"name":"Wallace Wells","img":"3.jpg"},
            {"id":3,"name":"Knives Chau","img":"4.jpg"},
            {"id":4,"name":"Stephen Stills","img":"5.jpg"},
            {"id":5,"name":"Kim Pine","img":"6.jpg"},
            {"id":6,"name":"Young Neil","img":"7.jpg"},
            {"id":7,"name":"Envy Adams","img":"8.jpg"},
            {"id":8,"name":"Stacey Pilgrim","img":"9.jpg"},
            {"id":9,"name":"Julie Powers","img":"a.jpg"},
            {"id":10,"name":"Lynette Guycott","img":"c.jpg"},
            {"id":11,"name":"Michael Comeau","img":"be.jpg"},
            {"id":12,"name":"Simon Lee","img":"d.jpg"},
        ];

        var challengeTypeData = [
            {"id":0,"name":"SellingChallenge"},
        ];

	    var profileData = {
	    	"firstname": "Daria",
	    	"lastname": "Minina",
	    	"img":"dasha.jpeg",
	    	"mail":"d.minina@cubesolutions.ru",
	    	"company": "cubesolutions",
	    	"group": "moscow",
	    	"points":90,          
	    	"position":3,
	    	"totalPositions":10,
            "coins":20,
            "coinsChange":5,
            "lastLogin": 1500649789,
            "badges":[
                {"type": 1, "timestamp": 1499697164},
                {"type": 2, "timestamp": 1499697164},
                {"type": 3, "timestamp": 1499697164},
                {"type": 4, "timestamp": 1499697164},
            ]
        };

        var newsData = [
        	{
                "id": 1,
                "timestamp":1499786564,
                "branch": "Strogino",
                "img": "dasha.jpeg",
                "name": "Daria Minina",
                "type": 1,
                "result": "Sell 5 of Sony Xperia XA1 Dual"
            },
            {
                "id": 2,
                "timestamp":1499786564,
                "branch": "Universitet",
                "img": "vlad.jpeg",
                "name": "Dmitry Nikolaev",
                "type": 2,
                "result": "Sell 5 of Samsung Galaxy 7"
            },
            {
                "id": 3,
                "timestamp":1499786564,
                "branch": "Kievskaya",
                "img": "max.jpeg",
                "name": "Alexandr Sorokin",
                "type": 3,
                "result": "Best agent today!"
            }
        ];

        var challengeData = [
            {
            	"id":0,
                "type": 0,
                "amount": 20,
                "product": ['Phone'],
                "productId": [1],
                "yourProgress": 0,
                "opponent": null,
                "opponentId": null,
                "opponentProgress": 0,
                "createDate": "2017-07-13 12:00",
                "acceptDate": null,
                "endDate": "2017-11-13 12:00",
                "fee": 5,
                "reward": {"coins":100,"points":200},
                "acceptedby":["Scott Pilgrim", "Ramona Flowers"],
                "status": 0
            },
            {
                "id":1,
                "type": 0,
                "amount": 5,
                "product": ['iPhone SE','iPhone 6S'],
                "productId": [4,5],
                "yourProgress": 0,
                "opponent": "Knives Chau",
                "opponentId": 3,
                "opponentProgress": 0,
                "createDate": "2017-07-15 12:00",
                "acceptDate": null,
                "endDate": "2017-10-10 12:00",
                "fee": 30,
                "reward": {"coins":100,"points":200},
                "acceptedby":["Knives Chau"],
                "status": 0
            },
            {
            	"id":2,
                "type": 0,
                "amount": 5,
                "product": ['Tablet'],
                "productId": [2],
                "yourProgress": 4,
                "opponent": "Ramona Flowers",
                "opponentId": 1,
                "opponentProgress": 3,
                "createDate": "2017-07-13 12:00",
                "acceptDate": "2017-07-14 12:00",
                "endDate": "2017-10-13 12:00",
                "fee": 20,
                "reward": {"coins":90,"points":300},
                "acceptedby":["Kim Pine"],
                "status": 1
            },
            {
                "id":3,
                "type": 0,
                "amount": 3,
                "product": ['Phone'],
                "productId": [1],
                "yourProgress": 0,
                "opponent": null,
                "opponentId": null,
                "opponentProgress": 0,
                "createDate": "2017-07-13 12:00",
                "acceptDate": "2017-07-14 12:00",
                "endDate": "2017-10-13 12:00",
                "fee": 20,
                "reward": {"coins":90,"points":300},
                "acceptedby":["Kim Pine"],
                "status": 1
            },
            {
            	"id":4,
                "type": 0,
                "amount": 30,
                "product": ['Notebook'],
                "productId": [3],
                "yourProgress": 30,
                "opponent": null,
                "opponentId": null,
                "opponentProgress": 0,
                "createDate": "2017-09-13 12:00",
                "acceptDate": null,
                "endDate": "2017-10-13 12:00",
                "fee": 20,
                "reward": {"coins":90,"points":300},
                "acceptedby":["Young Neil"],
                "status": 2
            },
            {
            	"id":5,
                "type": 0,
                "amount": 40,
                "product": ['Phone'],
                "productId": [1],
                "yourProgress": 30,
                "opponent": null,
                "opponentId": null,
                "opponentProgress": 0,
                "createDate": "2017-09-13 12:00",
                "acceptDate": null,
                "endDate": "2017-10-13 12:00",
                "fee": 20,
                "reward": {"coins":90,"points":300},
                "acceptedby":["Stephen Stills","Stacey Pilgrim"],
                "status": 3
            },
            {
            	"id":6,
                "type": 0,
                "amount": 50,
                "product": ['Tablet'],
                "productId": [2],
                "yourProgress": 0,
                "opponent": "Julie Powers",
                "opponentProgress": 0,
                "createDate": "2017-09-13 12:00",
                "acceptDate": null,
                "endDate": "2017-10-13 12:00",
                "fee": 20,
                "reward": {"coins":90,"points":300},
                "acceptedby":[],
                "status": 4
            },

        ];

        var salesData = [
            {
                "type":"Phone",
                "typeId":4,
                "name":"iPhone SE",
                "sum": 600,
                "timestamp": moment().subtract(1,'days').unix()
            },
            {
                "type":"Phone",
                "typeId":5,
                "name":"iPhone 6S",
                "sum": 800,
                "timestamp": moment().subtract(2,'days').unix()
            },
            {
                "type":"Phone",
                "typeId":6,
                "name":"iPhone 7",
                "sum": 900,
                "timestamp": moment().subtract(3,'days').unix()
            },
            {
                "type":"Tablet",
                "typeId":7,
                "name":"iPad Pro",
                "sum": 800,
                "timestamp": moment().subtract(1,'days').unix()
            },
            {
                "type":"Tablet",
                "typeId":8,
                "name":"iPad",
                "sum": 500,
                "timestamp": moment().subtract(2,'days').unix()
            },
            {
                "type":"Tablet",
                "typeId":9,
                "name":"iPad Mini",
                "sum": 400,
                "timestamp": moment().subtract(3,'days').unix()
            },

        ];

        var coinsData = [
            {
                "type":2,
                "sum": 50,
                "timestamp": 1499686564
            },
            {
                "type":1,
                "sum": -5,
                "timestamp": 1499686564
            },
            {
                "type":3,
                "sum": 10,
                "timestamp": 1499686564
            },
            {
                "type": 3,
                "sum": 50,
                "timestamp": 1499686564
            },
            {
                "type": 3,
                "sum": 70,
                "timestamp": 1499686564
            },
            {
                "type": 3,
                "sum": 20,
                "timestamp": 1499596564
            },
            {
                "type": 2,
                "sum": 10,
                "timestamp": 1498966564
            },
            {
                "type": 1,
                "sum": 300,
                "timestamp": 1497656564
            },
            {
                "type": 3,
                "sum": 30,
                "timestamp": 1495486564
            },
            {
                "type": 3,
                "sum": 60,
                "timestamp": 1492386564
            },
            {
                "type": 3,
                "sum": 80,
                "timestamp": 1499483564
            }
        ];

        var ratingData = [         
            {
                "pos": 11,
                "img": "vlad.jpeg",
                "name": "Dmitry (MegaMozg) Nikolaev",
                "branch": "Universitet",
                "rating": 14320
            },
            {
                "pos": 12,
                "img": "dasha.jpeg",
                "name": "Daria (Mini) Minina",
                "branch": "Strogino",
                "rating": 12560
            },
            {
                "pos": 13,
                "img": "max.jpeg",
                "name": "Alexandr(SuperKoder) Sorokin",
                "branch": "Kievskaya",
                "rating": 12450
            },
            {
                "pos": 14,
                "img": "grisha.jpeg",
                "name": "Grisha (Mouse) Movsesyan",
                "branch": "Kievskaya",
                "rating": 10020
            }
        ];

        var salesAggregateData = [
            {
                "key":"phones",
                "values":[
                    {
                        "label":1499130000,"value":10
                    },
                    {
                        "label":1499214600,"value":20
                    },
                    {
                        "label":1499299200,"value":40
                    },
                    {
                        "label":1499385600,"value":80
                    },
                    {
                        "label":1499472000,"value":160
                    },
                    {
                        "label":1499558400,"value":320
                    },
                    {
                        "label":1499644800,"value":640
                    },
                ],
            },
            {
                "key":"tablets",
                "values":[
                    {
                        "label":1499130000,"value":10
                    },
                    {
                        "label":1499214600,"value":20
                    },
                    {
                        "label":1499299200,"value":40
                    },
                    {
                        "label":1499385600,"value":80
                    },
                    {
                        "label":1499472000,"value":160
                    },
                    {
                        "label":1499558400,"value":320
                    },
                    {
                        "label":1499644800,"value":640
                    },
                ]
            },
            {
                "key":"laptops",
                "values":[
                    {
                        "label":1499130000,"value":10
                    },
                    {
                        "label":1499214600,"value":20
                    },
                    {
                        "label":1499299200,"value":40
                    },
                    {
                        "label":1499385600,"value":80
                    },
                    {
                        "label":1499472000,"value":160
                    },
                    {
                        "label":1499558400,"value":320
                    },
                    {
                        "label":1499644800,"value":640
                    },
                ]
            }
        ];

	});