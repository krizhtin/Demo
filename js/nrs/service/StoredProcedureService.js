angular.module("mainSystemModule").factory('StoredProcedureService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var StoredProcedureService = r(d.getSourceUrl() + '/storedProcedures/:id', null, {
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

	this.getAll = function(callback) {
		return StoredProcedureService.get( function(result){
			hateoas(result._embedded.storedProcedures);

			if(callback) callback(result);
		});
	}

	this.save = function(storedProcedure, callback) {
		var storedProcedure = new StoredProcedureService(storedProcedure);
		storedProcedure.$save(function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.update = function(item, success, error) {
		StoredProcedureService.update({
			id: item.id
		}, item, function(result){
			// hateoas(result);
			if(success) success(result);
		});
	}

	this.delete = function(storedProcedure, callback) {
		StoredProcedureService.delete({id: storedProcedure.id}, function(result) {
			if(callback) callback(result);
		});
	}

	return this;
}]);