angular.module('app')
	.service('DataProviderService', function () {
	    this.getProfileData = function () { return profileData};

	    var profileData = {
	    	"firstname": "Daria",
	    	"lastname": "Minina",
	    	"img":"dasha.jpeg",
	    	"mail":"d.minina@cubesolutions.ru",
	    	"group": "cubesolutions",
	    	"level": 11,
	    	"points":1234,
	    	"position":13,
	    	"totalPositions":45,
	    	"nextLevel":1500,
	    	"prevLevel":1000,
            "coins":1988,
            "coinsChange":5,
            "badges":[
                {"type": 1, "timestamp": 1499697164},
                {"type": 2, "timestamp": 1499697164},
                {"type": 3, "timestamp": 1499697164},
                {"type": 4, "timestamp": 1499697164},
            ]
        };
        /*
        "news":[
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
        ],
        "challenges":[
            {
                "id": 1,
                "type": 1,
                "amount": 5,
                "product": 3,
                "progress": 75,
                "expires": 1499697164,
                "status": 1
            },
            {
                "id": 2,
                "type": 1,
                "amount": 7,
                "product": 5,
                "progress": 80,
                "expires": 1499786564,
                "status": 2
            },
            {
                "id": 3,
                "type": 1,
                "amount": 3,
                "product": 7,
                "progress": 50,
                "expires": 1499786564,
                "status": 3
            },
            {
                "id": 4,
                "type": 1,
                "amount": 10,
                "product": 8,
                "progress": 50,
                "expires": 1499786564,
                "status": 4
            }
        ],
        "sales":[
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
        ]
    };
    */
	});