angular.module("mainSystemModule").factory('CatalogueStatusService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var CatalogueStatusService = r(d.getSourceUrl() + '/users/:id', null, {
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
		return CatalogueStatusService.get({id: id}, function(result){
			hateoas(result, function(){
				callback(result);
			});
		});
	}

	this.getAll = function(callback) {
		return CatalogueStatusService.get( function(result){
			hateoas(result._embedded.catalogStatuses);

			if(callback) callback(result);
		});
	}

	return this;
}]);