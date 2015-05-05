angular.module("mainSystemModule").factory('PointsLiftService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var PointsLiftService = r(d.getSourceUrl() + '/users/:id', null, {
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
		return PointsLiftService.get({id: id}, function(result){
			hateoas(result, function(){
				callback(result);
			});
		});
	}

	this.getByCardNbr = function(id, callback) {
		return PointsLiftService.get({id: id}, function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.getAll = function(callback) {
		return PointsLiftService.get( function(result){
			hateoas(result._embedded.pointsLifts);

			if(callback) callback(result);
		});
	}

	this.update = function(pts_lift, callback) {
		PointsLiftService.update({
			id: pts_lift.id
		}, user, function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	return this;
}]);