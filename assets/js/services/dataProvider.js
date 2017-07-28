angular.module('app')
	.service('DataProviderService', function () {
	    this.getProfileData = function () { return profileData};
	    this.getNewsData = function () { return newsData};
	    this.getChallengesData = function () { return challengeData};
	    this.getSalesData = function () { return salesData};
	    this.getSalesAggregateData = function () { return salesAggregateData};
	    this.getCoinsData = function () { return coinsData};
	    this.getRatingData = function () { return ratingData};

        this.getProductData = function () { return productData};
        this.getChallengeTypeData = function () { return challengeTypeData};

        this.getPersonData = function (name) { 
            return personData;
        };

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
            {"id":0,"name":"Stan Marsh","img":"1.jpg"},
            {"id":1,"name":"Kyle Broflovski","img":"2.jpg"},
            {"id":2,"name":"Eric Cartman","img":"3.jpg"},
            {"id":3,"name":"Kenny McCormick","img":"4.jpg"},
            {"id":4,"name":"Butters Stotch","img":"5.jpg"},
            {"id":5,"name":"Wendy Testaburger","img":"6.jpg"},
            {"id":6,"name":"Tweek Tweak","img":"7.jpg"},
            {"id":7,"name":"Bebe Stevens","img":"8.jpg"},
            {"id":8,"name":"Bradley Biggle","img":"9.jpg"},
            {"id":9,"name":"Clyde Donovan","img":"a.jpg"},
            {"id":10,"name":"Craig Tucker","img":"c.jpg"},
            {"id":11,"name":"Dougie","img":"be.jpg"},
            {"id":12,"name":"Heidi Turner","img":"d.jpg"},
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
	    	"level": 11,
	    	"points":1234,
	    	"position":13,
	    	"totalPositions":45,
	    	"nextLevel":1500,
	    	"prevLevel":1000,
            "coins":1988,
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
                "yourProgress": 0,
                "opponent": null,
                "opponentProgress": 0,
                "createDate": "2017-07-13 12:00",
                "acceptDate": null,
                "endDate": "2017-11-13 12:00",
                "fee": 20,
                "reward": {"coins":100,"points":200},
                "acceptedby":["Ivan Ivanov", "Grigory Movsesyan"],
                "status": 0
            },
            {
                "id":1,
                "type": 0,
                "amount": 20,
                "product": ['iPhone SE','iPhone 6S'],
                "yourProgress": 0,
                "opponent": "Grigory Movsesyan",
                "opponentProgress": 0,
                "createDate": "2017-07-15 12:00",
                "acceptDate": null,
                "endDate": "2017-10-10 12:00",
                "fee": 20,
                "reward": {"coins":100,"points":200},
                "acceptedby":["Ivan Ivanov", "Grigory Movsesyan"],
                "status": 0
            },
            {
            	"id":2,
                "type": 0,
                "amount": 10,
                "product": ['Tablet'],
                "yourProgress": 75,
                "opponent": "Grigory Movsesyan",
                "opponentProgress": 50,
                "createDate": "2017-07-13 12:00",
                "acceptDate": "2017-07-14 12:00",
                "endDate": "2017-10-13 12:00",
                "fee": 20,
                "reward": {"coins":90,"points":300},
                "acceptedby":["Grigory Movsesyan"],
                "status": 1
            },
            {
            	"id":3,
                "type": 0,
                "amount": 30,
                "product": ['Notebook'],
                "yourProgress": 100,
                "opponent": null,
                "opponentProgress": 0,
                "createDate": "2017-09-13 12:00",
                "acceptDate": null,
                "endDate": "2017-10-13 12:00",
                "fee": 20,
                "reward": {"coins":90,"points":300},
                "acceptedby":["Grigory Movsesyan"],
                "status": 2
            },
            {
            	"id":4,
                "type": 0,
                "amount": 40,
                "product": ['Phone'],
                "yourProgress": 75,
                "opponent": null,
                "opponentProgress": 0,
                "createDate": "2017-09-13 12:00",
                "acceptDate": null,
                "endDate": "2017-10-13 12:00",
                "fee": 20,
                "reward": {"coins":90,"points":300},
                "acceptedby":["Grigory Movsesyan"],
                "status": 3
            },
            {
            	"id":5,
                "type": 0,
                "amount": 50,
                "product": ['Tablet'],
                "yourProgress": 0,
                "opponent": "Grigory Movsesyan",
                "opponentProgress": 0,
                "createDate": "2017-09-13 12:00",
                "acceptDate": null,
                "endDate": "2017-10-13 12:00",
                "fee": 20,
                "reward": {"coins":90,"points":300},
                "acceptedby":["Grigory Movsesyan"],
                "status": 4
            },

        ];

        var salesData = [
            {
                "type":0,
                "name":"Apple iPhone 5s 32Gb",
                "sum": 650,
                "timestamp": "2017-10-13 12:00"
            }
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