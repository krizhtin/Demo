angular.module("mainSystemModule").factory('RewardsProgramService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var RewardsProgramService = r(d.getSourceUrl() + '/rewardsPrograms/:id', null, {
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
		return RewardsProgramService.get({id: id}, function(result){
			hateoas(result, function(){
				callback(result);
			});
		});
	}

	this.getAllWithFilter = function(search, page, size, sort, sorttype, callback) {
		var RewardsProgramServiceSearch = r(d.getSourceUrl() + '/rewardsPrograms/search/' + search.column + 'StartsWithIgnoreCase', null, {
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

		return RewardsProgramServiceSearch.query(filters, function(result){
			console.log("filters : ",result);
			hateoas(result._embedded.rewardsPrograms);
			if(callback) callback(result);
		});
	}

	this.getAll = function(callback) {
		return RewardsProgramService.get( function(result){
			hateoas(result._embedded.rewardsPrograms);

			if(callback) callback(result);
		});
	}

	this.save = function(rewardsProgram, callback) {
		var rewardsprogram = new RewardsProgramService(rewardsProgram);
		rewardsprogram.$save(function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.update = function(rewardsProgram, callback) {
		RewardsProgramService.update({
			id: rewardsProgram.id
		}, rewardsProgram, function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.delete = function(rewardsProgram, callback) {
		RewardsProgramService.delete({id: rewardsProgram.id}, function(result) {
			if(callback) callback(result);
		});
	}
	
	return this;
}]);