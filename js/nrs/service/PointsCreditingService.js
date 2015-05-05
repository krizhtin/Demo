angular.module("mainSystemModule").factory('PointsCreditingService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var PointsCreditingService = r(d.getSourceUrl() + '/pointsCreditings/:id', null, {
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
		return PointsCreditingService.get({id: id}, function(result){
			hateoas(result, function(){
				callback(result);
			});
		});
	}

	this.getAllWithFilter = function(search, page, size, sort, sorttype, callback) {
		var PointsCreditingServiceSearch = r(d.getSourceUrl() + '/pointsCreditings/search/' + search.column + 'StartsWithIgnoreCase', null, {
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

		return PointsCreditingServiceSearch.query(filters, function(result){
			console.log("filters : ",result);
			hateoas(result._embedded.pointsCreditings);
			if(callback) callback(result);
		});
	}

	this.getAll = function(callback) {
		return PointsCreditingService.get( function(result){
			hateoas(result._embedded.pointsCreditings);

			if(callback) callback(result);
		});
	}

	this.save = function(pointsCrediting, callback) {
		var rewardsprogram = new PointsCreditingService(pointsCrediting);
		rewardsprogram.$save(function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.update = function(pointsCrediting, callback) {
		PointsCreditingService.update({
			id: pointsCrediting.id
		}, pointsCrediting, function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.delete = function(pointsCrediting, callback) {
		PointsCreditingService.delete({id: pointsCrediting.id}, function(result) {
			if(callback) callback(result);
		});
	}
	
	return this;
}]);