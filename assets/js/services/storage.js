angular.module('app')
	.service('StorageService', function () {
		var data = {};

		this.apply = function (upd){
			if(!(upd.name in data))
				throw "Error Data Update! Key " + upd.name + " does not exist!";
			this[upd.type](upd.name,upd.data);
		};
		this.get = function (name){
			return data[name];
		};
		this.set = function (name, value){
			data[name] = value;
		};
		this.update = function (name, value){
			if(name == 'profile'){
				data[name][value.key] = value.value;
			}else{
				var idx = data[name].findIndex(x => x.id === value.id);
				data[name][idx] = value;
			}
		};
		this.add = function (name, value) {
			data[name].push(value);
		};
		this.delete = function (name, id) {
			data[name] = data[name].filter(function(x) {return x.id !== id;});
		};
	});