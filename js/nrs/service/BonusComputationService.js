angular.module("mainSystemModule").factory('BonusComputationService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var BonusComputationService = r(d.getSourceUrl() + '/bonusComputations/:id', null, {
		query: {
			method: 'GET',
			isArray: false
		},
		update: {
			method: 'PUT'
		},
		delete: {
            method: 'DELETE',
            params: {
                id:"@id"
            }
        }
	});

	this.getById = function(id, callback) {
		return BonusComputationService.get({id: id}, function(result){
			hateoas(result, function(){
				callback(result);
			});
		});
	}

	this.getAllWithFilter = function(search, page, size, sort, sorttype, callback) {
		var BonusComputationServiceSearch = r(d.getSourceUrl() + '/bonusComputations/search/' + search.column + 'StartsWithIgnoreCase', null, {
			query: {
				method: 'GET',
				isArray: false
			}
		});

		var filters = {
			page: page,
			size: size,
			sort: sort + "," + sorttype
		};
		console.log("search:: ", search);
		filters[search.column] = search.value;

		return BonusComputationServiceSearch.query(filters, function(result){
			console.log("filters : ",result);
			hateoas(result._embedded.bonusComputations);
			if(callback) callback(result);
		});
	}

	this.getAll = function(callback) {
		return BonusComputationService.get( function(result){
			hateoas(result._embedded.bonusComputations);

			if(callback) callback(result);
		});
	}

	this.save = function(bonusComputation, callback) {
		var rewardsprogram = new BonusComputationService(bonusComputation);
		rewardsprogram.$save(function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.update = function(bonusComputation, callback) {
		BonusComputationService.update({
			id: bonusComputation.id
		}, bonusComputation, function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.delete = function(bonusComputation, callback) {
		BonusComputationService.delete({id: bonusComputation.id}, function(result) {
			if(callback) callback(result);
		});
	}
	
	return this;
}]);