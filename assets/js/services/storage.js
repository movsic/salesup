angular.module('app')
	.service('StorageService', function () {
		var data = {};

		this.apply = function (upd){
			for(i in upd){
				if(!(upd[i].name in data))
					throw "Error Data Update! Key " + upd[i].name + " does not exist!";
				this[upd[i].type](upd[i].name,upd[i].data);
			}
		};
		this.get = function (name){
			return data[name];
		};
		this.set = function (name, value){
			data[name] = value;
		};
		this.update = function (name, value){
			if(name == 'profile'){
				data[name] = value;
			}else{
				var item = data[name].find(x => x.id === value.id);
				item = value;
			}
		};
		this.add = function (name, value) {
			data[name].push(value);
		};
		this.delete = function (name, id) {
			data[name] = data[name].filter(function(x) {return x.id !== id;});
		};
	});