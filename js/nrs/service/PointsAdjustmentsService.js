angular.module("mainSystemModule").factory('PointsAdjustmentsService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var PointsAdjustmentsService = r(d.getSourceUrl() + '/users/:id', null, {
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
		return PointsAdjustmentsService.get({id: id}, function(result){
			hateoas(result, function(){
				callback(result);
			});
		});
	}

	this.getByCardNbr = function(id, callback) {
		return PointsAdjustmentsService.get({id: id}, function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.getAll = function(callback) {
		return PointsAdjustmentsService.get( function(result){
			hateoas(result._embedded.pointsAdjustments);

			if(callback) callback(result);
		});
	}

	this.update = function(pts_adjust, callback) {
		PointsAdjustmentsService.update({
			id: pts_adjust.id
		}, user, function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	return this;
}]);