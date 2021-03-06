angular.module('app')
	.service('DataProviderService', function (HelperService) {
	    this.getProfileData = function () { return JSON.parse(JSON.stringify(profileData));};

        //this.getPersonData = function () {
        //    for( var i in personData){
        //        this.buildPerson(personData[i]);
        //    }
        //    return JSON.parse(JSON.stringify(personData));
        //}

	    this.getNewsData = function () {
            for( var i in newsData){
                this.buildNews(newsData[i]);
            }
            return JSON.parse(JSON.stringify(newsData));
        };

	    this.getChallengesData = function (id = -1) {
            var challenges = [];
            for( var i in challengeData){
                if( id in  challengeData[i].participants || id == -1 ){
                    challenges.push(this.buildChallenge(challengeData[i]));
                }
            }
            return JSON.parse(JSON.stringify(challenges));
        };

        this.getSalesData = function (id = -1) {
            var sales = [];
            for( var i in salesData){
                if( salesData[i].user.id == id || id == -1 ){
                    sales.push(this.buildSale(salesData[i]));
                }
            }
            return JSON.parse(JSON.stringify(sales));
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
            item.user = this.findProfileById(item.user.id);
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
        this.getUpdates = function() {
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

            update[-1].push({"type":"update","data":{"name":"news","type":"add","obj":{"timestamp":moment().unix(),"type":0,"user":profile,"params":challenge}}});
            update[profile.id].push({"type":"update","data":{"name":"challenges","type":"update","obj":challenge}});
            update[profile.id].push({"type":"update","data":{"name":"profile","type":"update","obj":{"key":"coins","value":profile.coins}}});

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

            //prepare objects
            //TODO what if we would have more ids?
            //TODO move updates to separate function! & check if user is online!
            update[profile.id] = [];
            update[profileData.id] = [];
            update[1] = [];
            update[2] = [];
            update[-1] = [];  

            //udate statistics
            profile.statistics.actions += 1;
            profile.statistics.earned += sale.product.price;

            //check for new badges
            var badgeName = "actions";
            if(HelperService.getRankForBadge(badgeName, profile.statistics.actions - 1, configData) !==   HelperService.getRankForBadge(badgeName, profile.statistics.actions, configData)){
                var rank = HelperService.getRankForBadge("actions", profile.statistics.actions, configData);
                update[profile.id].push(
                    {"type":"notification","data":{"type":"info","text":"badge-new","params":{"name":"badge-"+badgeName,"img":"badge.png","rank":rank}}}
                );
                update[-1].push({"type":"update","data":{"name":"news","type":"add","obj":{"timestamp":moment().unix(),"type":2,"user":profile,"params":{"name":"badge-"+badgeName,"rank":rank}}}});
            }
            var badgeName = "earned";
            if(HelperService.getRankForBadge(badgeName, profile.statistics.earned - sale.product.price, configData) !==  HelperService.getRankForBadge(badgeName, profile.statistics.earned, configData)){
                var rank = HelperService.getRankForBadge(badgeName, profile.statistics.earned, configData);
                update[profile.id].push(
                    {"type":"notification","data":{"type":"info","text":"badge-new","params":{"name":"badge-"+badgeName,"img":"badge.png","rank":rank}}}
                );
                update[-1].push({"type":"update","data":{"name":"news","type":"add","obj":{"timestamp":moment().unix(),"type":2,"user":profile,"params":{"name":"badge-"+badgeName,"rank":rank}}}});
            }


            //save lvl to check did we get new level
            var startLevel = HelperService.getLevelForPoints(profile.points, configData);
            salesData[userId].push(sale);
            var actionBonusPoints = HelperService.getPointsForAction(profile.points, configData);
            profile.points += actionBonusPoints;
            update[profile.id].push({"type":"update","data":{"name":"sales","type":"add","obj":sale}});
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
                            //if this is P2P challenge...
                            if( challengeData[i].type == 1 ){
                                //do not send notification to yourself
                                if( challengeData[i].participants[userId].profile.id !== profile.id){
                                    //fail challenge for others
                                    challengeData[i].participants[userId].status = 4;
                                    update[userId].push({"type":"update","data":{"name":"challenges","type":"update","obj":challengeData[i]}});
                                    //TODO support params in front
                                    update[userId].push({"type":"notification","data":{"type":"error","text":"challenge-loss","params":{"user":profile,"challenge":challengeData[i]}}});
                                }
                            }
                        }
                        profile.coins += challengeData[i].reward.coins;
                        var challengeBonusPoints = HelperService.getPointsForChallenge(profile.points, configData)
                        profile.points += challengeBonusPoints;
                        profile.statistics.won += 1;

                        //check for new badges
                        var badgeName = "won";
                        if(HelperService.getRankForBadge(badgeName, profile.statistics.won-1, configData) !==  HelperService.getRankForBadge(badgeName, profile.statistics.won, configData)){
                            var rank = HelperService.getRankForBadge("won", profile.statistics.won, configData);
                            update[profile.id].push(
                                {"type":"notification","data":{"type":"info","text":"badge-new","params":{"name":"badge-"+badgeName,"img":"badge.png","rank":rank}}}
                            );
                            update[-1].push({"type":"update","data":{"name":"news","type":"add","obj":{"timestamp":moment().unix(),"type":2,"user":profile,"params":{"name":"badge-"+badgeName,"rank":rank}}}});
                        }

                        update[profile.id].push({"type":"modal","data":{"type":"win","params":{"challenge":challengeData[i],"points":challengeBonusPoints}}});
                        update[-1].push({"type":"update","data":{"name":"news","type":"add","obj":{"timestamp":moment().unix(),"type":1,"user":profile,"params":challengeData[i]}}});
                    }else{
                        //if it is P2P challenge - send challenge updates to other users
                        //if it is regular challenge - updates are too expencive
                        if( challengeData[i].type == 1 ){
                            //inform others that one is performing
                            for ( var userId in challengeData[i].participants ){
                                //do not send notification to yourself
                                if( challengeData[i].participants[userId].profile.id !== profile.id){
                                    //TODO support params in front
                                    update[userId].push({"type":"notification","data":{"type":"warning","text":"opponent-sale","params":{"user":profile,"challenge":challengeData[i]}}});
                                    //send challenge update to others
                                    update[userId].push({"type":"update","data":{"name":"challenges","type":"update","obj":challengeData[i]}});
                                }
                            }
                        }
                    }
                    update[profile.id].push({"type":"update","data":{"name":"challenges","type":"update","obj":challengeData[i]}});
                }
            }
            update[profile.id].push({"type":"update","data":{"name":"profile","type":"update","obj":{"key":"coins","value":profile.coins}}});
            update[profile.id].push({"type":"update","data":{"name":"profile","type":"update","obj":{"key":"points","value":profile.points}}});
            update[profile.id].push({"type":"update","data":{"name":"profile","type":"update","obj":{"key":"statistics","value":profile.statistics}}});

            //level recalculation
            var endLevel = HelperService.getLevelForPoints(profile.points, configData);
            if(endLevel > startLevel){
                //check for new badges
                var badgeName = "level";
                if(HelperService.getRankForBadge(badgeName, endLevel, configData) !==  HelperService.getRankForBadge(badgeName, startLevel, configData)){
                    var rank = HelperService.getRankForBadge(badgeName, profile.statistics.earned, configData);
                    update[profile.id].push(
                        {"type":"notification","data":{"type":"info","text":"badge-new","params":{"name":"badge-"+badgeName,"img":"badge.png","rank":rank}}}
                    );
                    update[-1].push({"type":"update","data":{"name":"news","type":"add","obj":{"timestamp":moment().unix(),"type":2,"user":profile,"params":{"name":"badge-"+badgeName,"rank":rank}}}});
                }
                //TODO this should be the firs event!!! to prevent everything from update!
                update[-1].push({"type":"update","data":{"name":"news","type":"add","obj":{"timestamp":moment().unix(),"type":3,"user":profile,"params":{"level":endLevel} }}});
                update[profile.id].push({"type":"modal","data":{"type":"levelup","params":{"level":endLevel,"actionPoints":HelperService.getPointsForAction(endLevel, configData),"challengePoints":HelperService.getPointsForChallenge(endLevel, configData)}}});
            }

            //joining peronal updates with public updates
            //TODO -> fix sending update to test account!
            return update[profileData.id].concat(update[-1]);
        }

        var getRandomTimestamp = function (days){
            //rnd +- 6 hours
            var minutes = days * 60 * 24 + Math.floor(Math.random() * -360);
            return moment().add(minutes,'minutes').unix();
        }

        var configData = {
            "pointsToLevel":[10,50,100,200,500,1000,2000,3000,5000],
            "pointsForChallenge":[1,5,10,20,50,100,200,300,500],
            "pointsForAction":[1,2,5,10,25,50,100,150,250],
            "badges":{
                "actions":[0,1,5,10,20,50,100],
                "won":[0,1,5,10,20,50,100],
                "earned":[0,1000,5000,10000,20000,50000,100000],
                "level":[0,1,5,10,20,50,100],
            },
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
            {"id":1,"name":"Spiky Hedgehog","img":"1.jpg","points":10240,"group":"Vologda","coins":0,"statistics":{"actions":0,"won":0,"earned":0}},
            {"id":2,"name":"Deadly Bunny","img":"2.jpg","points":20480,"group":"Moscow","coins":0,"statistics":{"actions":0,"won":0,"earned":0}},
            {"id":3,"name":"Sly Fox","img":"3.jpg","points":5120,"group":"Vologda","coins":0,"statistics":{"actions":0,"won":0,"earned":0}},
            {"id":4,"name":"Grey Mouse","img":"4.jpg","points":2560,"group":"Moscow","coins":0,"statistics":{"actions":0,"won":0,"earned":0}},
            {"id":5,"name":"Monochrome Zebra","img":"5.jpg","points":1280,"group":"Vologda","coins":0,"statistics":{"actions":0,"won":0,"earned":0}},
            {"id":6,"name":"Swift Turtle","img":"6.jpg","points":640,"group":"Moscow","coins":0,"statistics":{"actions":0,"won":0,"earned":0}},
            {"id":7,"name":"Invisible Elephant","img":"7.jpg","points":320,"group":"Vologda","coins":0,"statistics":{"actions":0,"won":0,"earned":0}},
            {"id":8,"name":"Cute Giraffe","img":"8.jpg","points":160,"group":"Moscow","coins":0,"statistics":{"actions":0,"won":0,"earned":0}},
            {"id":9,"name":"Pinky Piggy","img":"9.jpg","points":80,"group":"Vologda","coins":0,"statistics":{"actions":0,"won":0,"earned":0}},
            {"id":10,"name":"Lazy Crocodile","img":"a.jpg","points":40,"group":"Moscow","coins":0,"statistics":{"actions":0,"won":0,"earned":0}},
            {"id":11,"name":"Furious Kitten","img":"c.jpg","points":20,"group":"Vologda","coins":0,"statistics":{"actions":0,"won":0,"earned":0}},
            {"id":12,"name":"Giant Python","img":"be.jpg","points":10,"group":"Moscow","coins":0,"statistics":{"actions":0,"won":0,"earned":0}},
            {"id":13,"name":"Dreamy Whale","img":"d.jpg","points":0,"group":"Vologda","coins":0,"statistics":{"actions":0,"won":0,"earned":0}},
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
            "statistics":{
                "actions":3,"won":4,"earned":1256,
            }
        };
        //"daily":{"actions":1,"challengesWon":1,"challengesAccepted":4,"money":100},
        //"day":moment().format("DD.MM.YYYY"),

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
                "params": {"name":"badge-actions","rank":3}
            },
            {
                "timestamp":getRandomTimestamp(-3),
                "user": {"id":4},
                "type": 3,
                "params": {"level":2}
            }
        ];

        var salesData = [
            {"product":{"id":1},"user":{"id":0},"timestamp": getRandomTimestamp(-0)},
            {"product":{"id":2},"user":{"id":0},"timestamp": getRandomTimestamp(-2)},
            {"product":{"id":3},"user":{"id":0},"timestamp": getRandomTimestamp(-3)},
            {"product":{"id":4},"user":{"id":0},"timestamp": getRandomTimestamp(-4)},
            {"product":{"id":5},"user":{"id":0},"timestamp": getRandomTimestamp(-5)},
            {"product":{"id":6},"user":{"id":0},"timestamp": getRandomTimestamp(-0)},
            {"product":{"id":7},"user":{"id":0},"timestamp": getRandomTimestamp(-1)},
            {"product":{"id":8},"user":{"id":0},"timestamp": getRandomTimestamp(-2)},
            {"product":{"id":0},"user":{"id":0},"timestamp": getRandomTimestamp(-3)},
            {"product":{"id":1},"user":{"id":0},"timestamp": getRandomTimestamp(-4)},
            {"product":{"id":2},"user":{"id":0},"timestamp": getRandomTimestamp(-5)},
            {"product":{"id":3},"user":{"id":0},"timestamp": getRandomTimestamp(-6)},
        ];

        //status 0=In Progress 1=New 2=Successful 3=Pending 4=Failed
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
                    1:{
                        "progress":3,
                        "status":0,
                        "acceptDate":getRandomTimestamp(-1),
                        "profile":{"id":1},
                    },
                    2:{
                        "progress":5,
                        "status":2,
                        "acceptDate":getRandomTimestamp(-1),
                        "profile":{"id":2},
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
            {
                "comment":"P2P challenge",
                "id":4,
                "type": 1,
                "amount": 5,
                "products": {0:{"id":0}},
                "participants":{
                    0:{
                        "progress":3,
                        "status":0,
                        "acceptDate":getRandomTimestamp(-1),
                        "profile":{"id":0},
                    },
                    1:{
                        "progress":3,
                        "status":0,
                        "acceptDate":getRandomTimestamp(-1),
                        "profile":{"id":1},
                    },
                },
                "startDate": getRandomTimestamp(-3),
                "endDate": getRandomTimestamp(3),
                "fee": 5,
                "reward": {"coins":100},
            },
        ];
	});