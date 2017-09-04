angular.module('app')
	.service('DataProviderService', function (HelperService) {
	    this.getProfileData = function () { return JSON.parse(JSON.stringify(profileData));};

	    this.getNewsData = function () {
            for( var i in newsData){
                this.buildNews(newsData[i]);
            }
            return JSON.parse(JSON.stringify(newsData))
        };

	    this.getChallengesData = function () {
            for( var i in challengeData){
                this.buildChallenge(challengeData[i]);
            }
            return JSON.parse(JSON.stringify(challengeData));
        };

        this.getSalesData = function () {
            for( var i in salesData[profileData.id]){
                this.buildSale(salesData[profileData.id][i]);
            }
            return JSON.parse(JSON.stringify(salesData[profileData.id]));
        };

        //this.getCoinsData = function () { return JSON.parse(JSON.stringify(coinsData))};
        this.getRatingData = function () { return JSON.parse(JSON.stringify(personData));};
        this.getConfigData = function () { return JSON.parse(JSON.stringify(configData));};

        this.findProfileById = function(id) {
            //TODO hack, replace "me"
            if (id == profileData.id)
               return profileData;

            for (var i in personData){
                if (personData[i].id == id){
                    return personData[i];
                }
            }
        };

        this.findProductById = function(id) {
            for (var i in productData){
                if (productData[i].id == id){
                    return productData[i];
                }
            }
        };

        this.buildSale = function(item){
            item.product = this.findProductById(item.product.id);
            return item;
        }

        this.buildNews = function(item){
            item.user = this.findProfileById(item.user.id);
            if(item.type == 0 || item.type == 1){
                for(var i in item.params.products){
                    item.params.products[i] = this.findProductById(item.params.products[i].id);
                }
                //TODO: uncommit later
                //buildChallenge(news.params);
            }
            return item;
        }

        this.buildChallenge = function(challenge){
            for(var i in challenge.products){
                challenge.products[i] = this.findProductById(challenge.products[i].id);
            }
            for(var i in challenge.participants){
                challenge.participants[i].profile = this.findProfileById(i);
            }
            return challenge;
        }

        //this.getSalesAggregateData = function () { return JSON.parse(JSON.stringify(salesAggregateData))};

        //TODO: redo?
        //this.getChallengeTypeData = function () { return challengeTypeData};

        //TODO: why parameter?
        //this.getPersonData = function (name) { return JSON.parse(JSON.stringify(personData); };

        //debug TODO: needs to be trough server?
        this.getNotifications = function() {
            return [{"type":"notification","data":{
                "type":"success",
                "text":"greeting",
                "params":{"name":profileData.name}
            }}];
        }

        /*needs redo
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
        */

        this.acceptChallenge = function(userId, challengeId){
            var update = [];

            var challenge = challengeData.find(x => x.id === challengeId);
            if(!challenge || challenge.endDate < moment().unix()){
                return [{"type":"error","data":{"text":"challenge-not-found"}}];
            }
            this.buildChallenge(challenge);

            //challenge fee may be empty for regular challenges
            challenge.fee = HelperService.getChallengeFee(challenge, configData);

            var profile = this.findProfileById(userId);
            if(!profile){
                return [{"type":"error","data":{"text":"profile-not-found"}}];
            }
            if(!(profile.id in challenge.participants) || challenge.participants[profile.id].status !== 1){
                return [{"type":"error","data":{"text":"not-challenge-participant"}}];
            }
            if(profile.coins < challenge.fee){
                return [{"type":"error","data":{"text":"not-enough-coins"}}];
            }

            //TODO what if we would have more ids?
            update[profile.id] = [];
            update[-1] = []; 

            //TODO if last pending and challenge P2P - inform everybody that challenge starts
            profile.coins -= challenge.fee;
            challenge.participants[profile.id].status = 0;
            challenge.participants[profile.id].acceptDate = new Date().getTime();

            update[-1].push({"type":"update","data":{"name":"news","type":"add","data":{"timestamp":moment().unix(),"type":0,"user":profile,"params":challenge}}});
            update[profile.id].push({"type":"update","data":{"name":"challenges","type":"update","data":challenge}});
            update[profile.id].push({"type":"update","data":{"name":"profile","type":"update","data":{"key":"coins","value":profile.coins}}});

            return update[profile.id].concat(update[-1]);
        }

        //debug
        this.addSale = function(userId, productId){
            //TODO move update object outside function
            //update with positive index - updates for users
            //update with negative number - update for all
            var update = {};

            productId = productId || 0;
            sale = this.buildSale({"product":{"id":productId},"timestamp": moment().unix()});

            var profile = this.findProfileById(userId);
            if(!profile){
                //TODO redo errors
                return [{"type":"error","data":{"text":"profile-not-found"}}];
            }

            //udate statistics
            profile.statistics.total.sales += 1;
            profile.statistics.total.money += sale.product.price;
            
            if(profile.statistics.day !== moment().startOf('day').unix()){
                profile.statistics.day = moment().startOf('day').unix();
                profile.statistics.daily = {"sales":0,"challenges":0,"money":0};
            }

            profile.statistics.daily.sales += 1;
            profile.statistics.daily.money += sale.product.price;

            //prepare objects
            //TODO what if we would have more ids?
            update[profile.id] = [];
            update[-1] = [];  

            //save lvl to check did we get new level
            var startLevel = HelperService.getLevelForPoints(profile.points, configData);
            salesData[userId].push(sale);
            var actionBonusPoints = HelperService.getPointsForAction(profile.points, configData);
            profile.points += actionBonusPoints;
            update[profile.id].push({"type":"update","data":{"name":"sales","type":"add","data":sale}});
            update[profile.id].push({"type":"notification","data":{"type":"success","text":"your-sale","params":{"sale":sale.product.name,"points":actionBonusPoints}}});

            //TODO sent update to other challenge participants
            
            //check if any challenge is finished
            for (var i in challengeData){
                //if challenge is accepted and productId fits
                //TODO support challenge type 1 and 2
                // && (challengeData[i].type == 1 || challengeData[i].type == 2)
                //TODO more complex logic for status -> for p2p 
                if (profile.id in challengeData[i].participants 
                    && challengeData[i].participants[profile.id].status == 0 
                    && sale.product.id in challengeData[i].products
                    && challengeData[i].endDate > moment().unix()){
                    challengeData[i].participants[profile.id].progress += 1;
                    
                    if (challengeData[i].participants[profile.id].progress >= challengeData[i].amount){
                        //set status to successful
                        challengeData[i].participants[profile.id].status = 2;
                        //TODO do this only if challenge type == 2
                        for ( var userId in challengeData[i].participants ){
                            //do not send notification to yourself
                            if( challengeData[i].participants[userId].profile.id ){
                                //TODO support params in front
                                update[userId].push({"type":"notification","data":{"type":"error","text":"challenge-loss","params":{"user":profile,"challenge":challengeData[i]}}});
                            }
                            //TODO if challenge type 2 - stop challenge after winning it!
                        }
                        profile.coins += challengeData[i].reward.coins;
                        var challengeBonusPoints = HelperService.getPointsForChallenge(profile.points, configData)
                        profile.points += challengeBonusPoints;
                        profile.statistics.total.challenges += 1;
                        profile.statistics.daily.challenges += 1;

                        update[profile.id].push({"type":"modal","data":{"type":"win","params":{"challenge":challengeData[i],"points":challengeBonusPoints}}});
                        update[-1].push({"type":"update","data":{"name":"news","type":"add","data":{"timestamp":moment().unix(),"type":1,"user":profile,"params":challengeData[i]}}});
                    }else{
                        //inform others that one is performing
                        //TODO do it for regular challenge?
                        for ( var userId in challengeData[i].participants ){
                            //do not send notification to yourself
                            if( challengeData[i].participants[userId].profile.id !== profile.id){
                                //TODO support params in front
                                update[userId].push({"type":"notification","data":{"type":"warning","text":"opponent-sale","params":{"user":profile,"challenge":challengeData[i]}}});
                            }
                        }
                    }
                    update[profile.id].push({"type":"update","data":{"name":"challenges","type":"update","data":challengeData[i]}});
                }
            }
            update[profile.id].push({"type":"update","data":{"name":"profile","type":"update","data":{"key":"coins","value":profile.coins}}});
            update[profile.id].push({"type":"update","data":{"name":"profile","type":"update","data":{"key":"points","value":profile.points}}});
            update[profile.id].push({"type":"update","data":{"name":"profile","type":"update","data":{"key":"statistics","value":profile.statistics}}});

            //level recalculation
            var endLevel = HelperService.getLevelForPoints(profile.points, configData);
            if(endLevel > startLevel){
                //TODO this should be the firs event!!! to prevent everything from update!
                update[-1].push({"type":"update","data":{"name":"news","type":"add","data":{"timestamp":moment().unix(),"type":3,"user":profile,"params":{"level":endLevel} }}});
                update[profile.id].push({"type":"modal","data":{"type":"levelup","params":{"level":endLevel,"actionPoints":HelperService.getPointsForAction(endLevel, configData),"challengePoints":HelperService.getPointsForChallenge(endLevel, configData)}}});
            }
            //joining peronal updates with public updates
            return update[profile.id].concat(update[-1]);
        }

        /*
        this.addOpponentSale = function(){
            var opponent = this.findProfileById(1);
            var update = {"data":[],"notifications":[],"modals":[]};
            update.notifications[0]={"type":"warning","text":"opponent-sale"};
            for (var i in challengeData){
                if (challengeData[i].opponentId == opponent.id && challengeData[i].status == 1 && challengeData[i].type == 0){
                    challengeData[i].opponentProgress += 1;
                    if (challengeData[i].opponentProgress >= challengeData[i].amount){
                        challengeData[i].status = 2;
                        update.notifications[0]={"type":"error","text":"challenge-loss"};
                        update.data.push({"name":"news","type":"add","data":{"timestamp":moment().unix(),"type":1,"user":opponent,"params":challenge}});
                    }
                    update.data.push({"name":"challenges","type":"update","data":challengeData[i]});
                }
            }
            return update;
        }
        */

        var getRandomTimestamp = function (days){
            //rnd +- 6 hours
            var minutes = days * 60 * 24 + Math.floor(Math.random() * -360);
            return moment().add(minutes,'minutes').unix();
        }

        var configData = {
            "pointsToLevel":[0,10,50,100,200,500,1000,2000,3000,5000],
            "pointsForChallenge":[0,1,5,10,20,50,100,200,300,500],
            "pointsForAction":[0,1,2,5,10,25,50,100,150,250],
            "achievements":[0,1,5,10,20,50,100],
            "challengeFee":0.2,
        };

        //block of debug data!
	    var productData = [
            {"id":0, "name":"iPhone SE", "type":"Phone", "price":325},
            {"id":1, "name":"iPhone 6S", "type":"Phone", "price":550},
            {"id":2, "name":"iPhone 7", "type":"Phone", "price":700},
            {"id":3, "name":"iPad Pro", "type":"Tablet", "price":800},
            {"id":4, "name":"iPad", "type":"Tablet", "price":400},
            {"id":5, "name":"iPad Mini", "type":"Tablet", "price":400},
            {"id":6, "name":"Macbook", "type":"Notebook", "price":1200},
            {"id":7, "name":"Macbook Air", "type":"Notebook", "price":900},
            {"id":8, "name":"Macbook Pro", "type":"Notebook", "price":1400},
        ];

        var personData = [
            {"id":1,"name":"Spiky Hedgehog","img":"1.jpg","points":10240,"group":"Vologda"},
            {"id":2,"name":"Deadly Bunny","img":"2.jpg","points":20480,"group":"Moscow"},
            {"id":3,"name":"Sly Fox","img":"3.jpg","points":5120,"group":"Vologda"},
            {"id":4,"name":"Grey Mouse","img":"4.jpg","points":2560,"group":"Moscow"},
            {"id":5,"name":"Monochrome Zebra","img":"5.jpg","points":1280,"group":"Vologda"},
            {"id":6,"name":"Swift Turtle","img":"6.jpg","points":640,"group":"Moscow"},
            {"id":7,"name":"Invisible Elephant","img":"7.jpg","points":320,"group":"Vologda"},
            {"id":8,"name":"Cute Giraffe","img":"8.jpg","points":160,"group":"Moscow"},
            {"id":9,"name":"Pinky Piggy","img":"9.jpg","points":80,"group":"Vologda"},
            {"id":10,"name":"Lazy Crocodile","img":"a.jpg","points":40,"group":"Moscow"},
            {"id":11,"name":"Furious Kitten","img":"c.jpg","points":20,"group":"Vologda"},
            {"id":12,"name":"Giant Python","img":"be.jpg","points":10,"group":"Moscow"},
            {"id":13,"name":"Dreamy Whale","img":"d.jpg","points":0,"group":"Vologda"},
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
                {"type": 1, "rank":1, "timestamp": getRandomTimestamp(-1)},
                {"type": 2, "rank":1, "timestamp": getRandomTimestamp(-2)},
                {"type": 3, "rank":1, "timestamp": getRandomTimestamp(-3)},
                {"type": 4, "rank":1, "timestamp": getRandomTimestamp(-4)},
            ],
            "statistics":{
                "total":{"actions":3,"challengesWon":4,"challengesAccepted":4,"money":1256},
                "daily":{"actions":1,"challengesWon":1,"challengesAccepted":4,"money":100},
                "day":moment().format("DD.MM.YYYY"),
            }
        };

        //type 0=Started Challenge 1=Won Challenge 2=Earned Badge 3=Levelup
        var newsData = [
        	{
                "timestamp":getRandomTimestamp(-1),
                "user": {"id":1},
                "type": 0,
                "params": {"id":1,"type":0,"amount":10,"products":[{"id":0},{"id":1},{"id":2}]}
            },
            {
                "timestamp":getRandomTimestamp(-2),
                "user": {"id":2},
                "type": 1,
                "params": {"id":2,"type":0,"amount":3,"products":[{"id":8}]}
            },
            {
                "timestamp":getRandomTimestamp(-3),
                "user": {"id":3},
                "type": 2,
                "params": {"type":1}
            },
            {
                "timestamp":getRandomTimestamp(-3),
                "user": {"id":4},
                "type": 3,
                "params": {"level":2}
            }
        ];

        var salesData = {
            0:[
            {"product":{"id":1},"timestamp": getRandomTimestamp(-0)},
            {"product":{"id":2},"timestamp": getRandomTimestamp(-2)},
            {"product":{"id":3},"timestamp": getRandomTimestamp(-3)},
            {"product":{"id":4},"timestamp": getRandomTimestamp(-4)},
            {"product":{"id":5},"timestamp": getRandomTimestamp(-5)},
            {"product":{"id":6},"timestamp": getRandomTimestamp(-0)},
            {"product":{"id":7},"timestamp": getRandomTimestamp(-1)},
            {"product":{"id":8},"timestamp": getRandomTimestamp(-2)},
            {"product":{"id":0},"timestamp": getRandomTimestamp(-3)},
            {"product":{"id":1},"timestamp": getRandomTimestamp(-4)},
            {"product":{"id":2},"timestamp": getRandomTimestamp(-5)},
            {"product":{"id":3},"timestamp": getRandomTimestamp(-6)},
            ],
        };

        //status 0=In Progress 1=New 2=Successful 3=Pending
        var challengeData = [
            {
                "comment":"active challenge for product id 0",
            	"id":0,
                "type": 0,
                "amount": 5,
                "products": {0:{"id":0}},
                "participants":{
                    0:{
                        "progress":3,
                        "status":0,
                        "acceptDate":getRandomTimestamp(-1),
                        "profile":{"id":0},
                    },
                },
                "startDate": getRandomTimestamp(-3),
                "endDate": getRandomTimestamp(3),
                "fee": 5,
                "reward": {"coins":100},
            },
            {
                "comment":"active challenge ENDED",
                "id":1,
                "type": 0,
                "amount": 1,
                "products": {0:{"id":0}},
                "participants":{
                    0:{
                        "progress":0,
                        "status":0,
                        "acceptDate":getRandomTimestamp(-1),
                        "profile":{"id":0},
                    },
                },
                "startDate": getRandomTimestamp(-3),
                "endDate": getRandomTimestamp(-1),
                "fee": 5,
                "reward": {"coins":100},
            },
            {
                "comment":"New challenge accepted by other user",
                "id":2,
                "type": 0,
                "amount": 10,
                "products": {6:{"id":6},7:{"id":7},8:{"id":8}},
                "participants":{
                    0:{
                        "progress":0,
                        "status":1,
                        "acceptDate":null,
                        "profile":{"id":0},
                    },
                    1:{
                        "progress":2,
                        "status":0,
                        "acceptDate":getRandomTimestamp(-3),
                        "profile":{"id":1},
                    },
                    2:{
                        "progress":10,
                        "status":2,
                        "acceptDate":getRandomTimestamp(-3),
                        "profile":{"id":2},
                    },
                    3:{
                        "progress":3,
                        "status":0,
                        "acceptDate":getRandomTimestamp(-3),
                        "profile":{"id":3},
                    },
                },
                "startDate": getRandomTimestamp(-3),
                "endDate": getRandomTimestamp(5),
                "fee": 0,
                "reward": {"coins":100},
            },
            {
                "comment":"too expencive challenge",
                "id":3,
                "type": 0,
                "amount": 15,
                "products": {3:{"id":3}},
                "participants":{
                    0:{
                        "progress":0,
                        "status":1,
                        "acceptDate":null,
                        "profile":{"id":0},
                    },
                },
                "startDate": getRandomTimestamp(-3),
                "endDate": getRandomTimestamp(3),
                "fee": 0,
                "reward": {"coins":100000},
            },
        ];
        /*
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
        */

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