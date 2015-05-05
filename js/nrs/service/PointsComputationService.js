angular.module("mainSystemModule").factory('PointsComputationService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var PointsComputationService = r(d.getSourceUrl() + '/pointsComputations/:id', null, {
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
		return PointsComputationService.get({id: id}, function(result){
			hateoas(result, function(){
				callback(result);
			});
		});
	}

	this.getAllWithFilter = function(search, page, size, sort, sorttype, callback) {
		var PointsComputationServiceSearch = r(d.getSourceUrl() + '/pointsComputations/search/' + search.column + 'StartsWithIgnoreCase', null, {
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

		return PointsComputationServiceSearch.query(filters, function(result){
			console.log("filters : ",result);
			hateoas(result._embedded.pointsComputations);
			if(callback) callback(result);
		});
	}

	this.getAll = function(callback) {
		return PointsComputationService.get( function(result){
			hateoas(result._embedded.pointsComputations);

			if(callback) callback(result);
		});
	}

	this.save = function(pointsComputation, callback) {
		var rewardsprogram = new PointsComputationService(pointsComputation);
		rewardsprogram.$save(function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.update = function(pointsComputation, callback) {
		PointsComputationService.update({
			id: pointsComputation.id
		}, pointsComputation, function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.delete = function(pointsComputation, callback) {
		PointsComputationService.delete({id: pointsComputation.id}, function(result) {
			if(callback) callback(result);
		});
	}
	
	return this;
}]);