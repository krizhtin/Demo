angular.module("mainSystemModule").factory('PointsTransferService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var PointsTransferService = r(d.getSourceUrl() + '/users/:id', null, {
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
		return PointsTransferService.get({id: id}, function(result){
			hateoas(result, function(){
				callback(result);
			});
		});
	}

	this.getByCardNbr = function(id, callback) {
		return PointsTransferService.get({id: id}, function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.getAll = function(callback) {
		return PointsTransferService.get( function(result){
			hateoas(result._embedded.pointsTransfers);

			if(callback) callback(result);
		});
	}

	this.update = function(pts_transfer, callback) {
		PointsTransferService.update({
			id: pts_transfer.id
		}, user, function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	return this;
}]);