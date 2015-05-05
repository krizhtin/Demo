angular.module("mainSystemModule").factory('UserBankService', ['$http', 'DataSource', '$resource', 'HateoasService', function(h, d, r, hateoas) {

	var BankService = r(d.getSourceUrl() + '/banks/:id', null, {
		query: {
			method: 'GET',
			isArray: false
		},
		update: {
			method: 'PUT'
		}
	});

	this.getById = function(id, callback) {
		return BankService.get({id: id}, function(result){
			hateoas(result, function(){
				if(callback) callback(result);
			});
		});
	}

	this.getAllWithFilter = function(page, size, sort, sorttype, others, callback) {
		return BankService.query($.extend({
			page: page,
			size: size,
			sort: sort + "," + sorttype
		}, others), function(result){
			hateoas(result._embedded.banks, function(){
				if(callback) callback(result);
			});
		});
	}

	this.getAll = function(callback) {
		return BankService.get( function(result){
			hateoas(result._embedded.banks, function(){});
			if(callback) callback(result);
		});
	}

	this.save = function(bank, callback) {
		var bank = new BankService(bank);
		bank.$save(function(result){
			hateoas(result, function(){
				if(callback) callback(result);
			});
		});
	}

	this.update = function(bank, callback) {
		BankService.update({
			id: bank.id
		}, bank, function(result){
			hateoas(result, function(){
				if(callback) callback(result);
			});
		});
	}

	return this;
}]);