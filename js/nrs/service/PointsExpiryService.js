angular.module("mainSystemModule").factory('PointsExpiryService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var PointsExpiryService = r(d.getSourceUrl() + '/pointsExpirys/:id', null, {
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
		return PointsExpiryService.get({id: id}, function(result){
			hateoas(result, function(){
				callback(result);
			});
		});
	}

	this.getAllWithFilter = function(search, page, size, sort, sorttype, callback) {
		var PointsExpiryServiceSearch = r(d.getSourceUrl() + '/pointsExpirys/search/' + search.column + 'StartsWithIgnoreCase', null, {
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

		return PointsExpiryServiceSearch.query(filters, function(result){
			console.log("filters : ",result);
			hateoas(result._embedded.pointsExpirys);
			if(callback) callback(result);
		});
	}

	this.getAll = function(callback) {
		return PointsExpiryService.get( function(result){
			hateoas(result._embedded.pointsExpirys);

			if(callback) callback(result);
		});
	}

	this.save = function(pointsExpiry, callback) {
		var rewardsprogram = new PointsExpiryService(pointsExpiry);
		rewardsprogram.$save(function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.update = function(pointsExpiry, callback) {
		PointsExpiryService.update({
			id: pointsExpiry.id
		}, pointsExpiry, function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.delete = function(pointsExpiry, callback) {
		PointsExpiryService.delete({id: pointsExpiry.id}, function(result) {
			if(callback) callback(result);
		});
	}
	
	return this;
}]);