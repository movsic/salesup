angular.module('app')
	.service('DataProviderService', function (HelperService) {
	    this.getProfileData = function () { return JSON.parse(JSON.stringify(profileData));};

	    this.getNewsData = function () {
            for( var i in newsData){
                newsData[i].user = this.findProfileById(newsData[i].user.id);
            }
            return JSON.parse(JSON.stringify(newsData))
        };

	    this.getChallengesData = function () {
            for( var i in challengeData){
                challengeData[i].opponent = this.findProfileById(challengeData[i].opponentId);
            }
            return JSON.parse(JSON.stringify(challengeData));
        };

        this.findProfileById = function(id) {
            for (var i in personData){
                if (personData[i].id == id){
                    return personData[i];
                }
            }
            return id;
        };

	    this.getSalesData = function () { 
            return JSON.parse(JSON.stringify(salesData));
        };

	    this.getSalesAggregateData = function () { return JSON.parse(JSON.stringify(salesAggregateData))};
	    this.getCoinsData = function () { return JSON.parse(JSON.stringify(coinsData))};
	    this.getRatingData = function () { return JSON.parse(JSON.stringify(personData));};
        this.getConfigData = function () { return JSON.parse(JSON.stringify(configData));};

        this.getChallengeTypeData = function () { return challengeTypeData};
        this.getPersonData = function (name) { 
            return personData;
        };

        this.getNotifications = function() {
            return {"notifications":[{
                "type":"success",
                "text":"greeting",
                "params":{"name":profileData.name}
            }]};
        }

        this.getPointsForSell = function (level) {
            return level;
        }

        this.getPointsForChallenge = function (level) {
            return level * 2;
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
                return {"error":"error-not-enough-coins","text":"error-coins"};
            profileData.coins -= challenge.fee;
            challenge.status = 1;
            challenge.acceptDate = new Date().getTime();


                //"timestamp":getRandomTimestamp(-1),
                //"user": {"id":1},
                //"type": 0,
                //"params": {"id":1,"type":0,"amount":10,"product":{"id":4,"name":"iPhone SE"}}

            //problem with product in challenge -> redo!!!
            return {"data":[
                {"name":"news","type":"add","data":{"timestamp":moment().unix(),"type":0,"user":profileData,"params":challenge}},
                {"name":"challenges","type":"update","data":challenge},
                {"name":"profile","type":"update","data":{"key":"coins","value":profileData.coins}},
            ]};
        }

        //debug
        this.addSale = function(){
            //save lvl to check did we get new level?
            var startLevel = HelperService.getLevelForPoints(profileData.points, configData);

            var update = {"data":[],"notifications":[],"modals":[]};
            var newSale = {"type":"Phone","typeId":1,"name":"iPhone SE","sum": 600,"timestamp": moment().unix()};
            var lvl = profileData.level;
            salesData.push(newSale);
            profileData.points += HelperService.getPointsForAction(profileData.points, configData);
            update.data.push({"name":"sales","type":"add","data":newSale});
            
            update.notifications.push({"type":"success","text":"your-sale","params":{"sale":newSale.name,"points":this.getPointsForSell(profileData.level)}});
            
            //check if any challenge is finished
            for (var i in challengeData){
                if ((challengeData[i].productId.indexOf(newSale.typeId) > -1 || challengeData[i].productId.indexOf(productData[newSale.typeId].typed) > -1)
                    && challengeData[i].status == 1 && challengeData[i].type == 0){
                    challengeData[i].yourProgress += 1;
                    if (challengeData[i].yourProgress >= challengeData[i].amount){
                        challengeData[i].status = 2;
                        profileData.coins += challengeData[i].reward.coins;
                        profileData.points += HelperService.getPointsForChallenge(profileData.points, configData);
                        update.modals.push({"type":"win","event":challengeData[i]});
                    }
                    update.data.push({"name":"challenges","type":"update","data":challengeData[i]});
                }
            }

            update.data.push({"name":"profile","type":"update","data":{"key":"coins","value":profileData.coins}});
            update.data.push({"name":"profile","type":"update","data":{"key":"points","value":profileData.points}});

            //level recalculation
            var endLevel = HelperService.getLevelForPoints(profileData.points, configData);
            if(endLevel < startLevel){
                //this should be the firs event!!! to prevent everything from update!
                update.modals.push({"type":"levelup","event":{"level":endLevel}});
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

        var getRandomTimestamp = function (days){
            //rnd +- 6 hours
            var minutes = days * 60 * 24 + Math.floor(Math.random() * -360);
            return moment().add(minutes,'minutes').unix();
        }

        var configData = {
            "pointsToLevel":[0,10,50,100,200,500,1000,2000,3000,5000],
            "pointsForChallenge":[0,1,5,10,20,50,100,200,300,500],
            "pointsForAction":[0,1,2,5,10,25,50,100,150,250],
        };

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
            {"id":1,"name":"Scott Pilgrim","img":"1.jpg","points":10240,"group":"Vologda"},
            {"id":2,"name":"Ramona Flowers","img":"2.jpg","points":20480,"group":"Moscow"},
            {"id":3,"name":"Wallace Wells","img":"3.jpg","points":5120,"group":"Vologda"},
            {"id":4,"name":"Knives Chau","img":"4.jpg","points":2560,"group":"Moscow"},
            {"id":5,"name":"Stephen Stills","img":"5.jpg","points":1280,"group":"Vologda"},
            {"id":6,"name":"Kim Pine","img":"6.jpg","points":640,"group":"Moscow"},
            {"id":7,"name":"Young Neil","img":"7.jpg","points":320,"group":"Vologda"},
            {"id":8,"name":"Envy Adams","img":"8.jpg","points":160,"group":"Moscow"},
            {"id":9,"name":"Stacey Pilgrim","img":"9.jpg","points":80,"group":"Vologda"},
            {"id":10,"name":"Julie Powers","img":"a.jpg","points":40,"group":"Moscow"},
            {"id":11,"name":"Lynette Guycott","img":"c.jpg","points":20,"group":"Vologda"},
            {"id":12,"name":"Michael Comeau","img":"be.jpg","points":10,"group":"Moscow"},
            {"id":13,"name":"Simon Lee","img":"d.jpg","points":0,"group":"Vologda"},
        ];

        var challengeTypeData = [
            {"id":0,"name":"SellingChallenge"},
        ];

	    var profileData = {
            "id":0,
	    	"name": "Daria Minina",
	    	"img":"dasha.jpeg",
	    	"mail":"d.minina@cubesolutions.ru",
	    	"company": "cubesolutions",
	    	"group": "Moscow",
	    	"points":90,       
            "coins":20,
            "lastLogin": 1500649789,
            "badges":[
                {"type": 1, "timestamp": getRandomTimestamp(-1)},
                {"type": 2, "timestamp": getRandomTimestamp(-2)},
                {"type": 3, "timestamp": getRandomTimestamp(-3)},
                {"type": 4, "timestamp": getRandomTimestamp(-4)},
            ]
        };

        //type 0=Started Challenge 1=Won Challenge 2=Earned Badge
        var newsData = [
        	{
                "timestamp":getRandomTimestamp(-1),
                "user": {"id":1},
                "type": 0,
                "params": {"id":1,"type":0,"amount":10,"product":{"id":4,"name":"iPhone SE"}}
            },
            {
                "timestamp":getRandomTimestamp(-2),
                "user": {"id":2},
                "type": 1,
                "params": {"id":2,"type":0,"amount":3,"product":{"id":12,"name":"Macbook Pro"}}
            },
            {
                "timestamp":getRandomTimestamp(-3),
                "user": {"id":3},
                "type": 2,
                "params": {"type":1}
            }
        ];

        //status 0=New 1=In Progress 2=Successful 3=Failed 4=Pending
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
                "createDate": getRandomTimestamp(-3),
                "acceptDate": null,
                "endDate": getRandomTimestamp(3),
                "fee": 5,
                "reward": {"coins":100},
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
                "opponent": null,
                "opponentId": 1,
                "opponentProgress": 0,
                "createDate": getRandomTimestamp(-3),
                "acceptDate": null,
                "endDate": getRandomTimestamp(3),
                "fee": 30,
                "reward": {"coins":100},
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
                "opponent": null,
                "opponentId": 2,
                "opponentProgress": 3,
                "createDate": getRandomTimestamp(-2),
                "acceptDate": getRandomTimestamp(-1),
                "endDate": getRandomTimestamp(5),
                "fee": 20,
                "reward": {"coins":90},
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
                "createDate": getRandomTimestamp(-4),
                "acceptDate": getRandomTimestamp(-2),
                "endDate": getRandomTimestamp(5),
                "fee": 20,
                "reward": {"coins":90},
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
                "createDate": getRandomTimestamp(-6),
                "acceptDate": getRandomTimestamp(-4),
                "endDate": getRandomTimestamp(-2),
                "fee": 20,
                "reward": {"coins":90},
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
                "createDate": getRandomTimestamp(-7),
                "acceptDate": getRandomTimestamp(-3),
                "endDate": getRandomTimestamp(-1),
                "fee": 20,
                "reward": {"coins":90},
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
                "opponent": null,
                "opponentId": 4,
                "opponentProgress": 0,
                "createDate": getRandomTimestamp(-10),
                "acceptDate": getRandomTimestamp(-9),
                "endDate": getRandomTimestamp(-6),
                "fee": 20,
                "reward": {"coins":90},
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
                "timestamp": getRandomTimestamp(-0)
            },
            {
                "type":"Phone",
                "typeId":5,
                "name":"iPhone 6S",
                "sum": 800,
                "timestamp": getRandomTimestamp(-2)
            },
            {
                "type":"Phone",
                "typeId":6,
                "name":"iPhone 7",
                "sum": 900,
                "timestamp": getRandomTimestamp(-3)
            },
            {
                "type":"Phone",
                "typeId":6,
                "name":"iPhone 7",
                "sum": 900,
                "timestamp": getRandomTimestamp(-4)
            },
            {
                "type":"Phone",
                "typeId":6,
                "name":"iPhone 7",
                "sum": 900,
                "timestamp": getRandomTimestamp(-5)
            },
            {
                "type":"Phone",
                "typeId":6,
                "name":"iPhone 7",
                "sum": 900,
                "timestamp": getRandomTimestamp(0)
            },
            {
                "type":"Tablet",
                "typeId":7,
                "name":"iPad Pro",
                "sum": 800,
                "timestamp": getRandomTimestamp(-1)
            },
            {
                "type":"Tablet",
                "typeId":8,
                "name":"iPad",
                "sum": 500,
                "timestamp": getRandomTimestamp(-2)
            },
            {
                "type":"Tablet",
                "typeId":9,
                "name":"iPad Mini",
                "sum": 400,
                "timestamp": getRandomTimestamp(-3)
            },
            {
                "type":"Tablet",
                "typeId":9,
                "name":"iPad Mini",
                "sum": 400,
                "timestamp": getRandomTimestamp(-4)
            },
            {
                "type":"Tablet",
                "typeId":9,
                "name":"iPad Mini",
                "sum": 400,
                "timestamp": getRandomTimestamp(-5)
            },
            {
                "type":"Tablet",
                "typeId":9,
                "name":"iPad Mini",
                "sum": 400,
                "timestamp": getRandomTimestamp(-6)
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