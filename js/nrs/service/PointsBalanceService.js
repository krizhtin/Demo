angular.module("mainSystemModule").factory('PointsBalanceService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var PointsBalanceService = r(d.getSourceUrl() + '/users/:id', null, {
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
		return PointsBalanceService.get({id: id}, function(result){
			hateoas(result, function(){
				callback(result);
			});
		});
	}

	this.getByCardNbr = function(id, callback) {
		return PointsBalanceService.get({id: id}, function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.getAll = function(callback) {
		return PointsBalanceService.get( function(result){
			hateoas(result._embedded.pointsBalances);

			if(callback) callback(result);
		});
	}

	this.update = function(pts_bal, callback) {
		PointsBalanceService.update({
			id: pts_bal.id
		}, user, function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	return this;
}]);