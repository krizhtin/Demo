angular.module("mainSystemModule").factory('PointsHoldService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var PointsHoldService = r(d.getSourceUrl() + '/users/:id', null, {
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
		return PointsHoldService.get({id: id}, function(result){
			hateoas(result, function(){
				callback(result);
			});
		});
	}

	this.getByCardNbr = function(id, callback) {
		return PointsHoldService.get({id: id}, function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.getAll = function(callback) {
		return PointsHoldService.get( function(result){
			hateoas(result._embedded.pointsHolds);

			if(callback) callback(result);
		});
	}

	this.update = function(pts_hold, callback) {
		PointsHoldService.update({
			id: pts_hold.id
		}, user, function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	return this;
}]);