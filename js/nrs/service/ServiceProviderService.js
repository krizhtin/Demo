angular.module("mainSystemModule").factory('ServiceProviderService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var ServiceProviderService = r(d.getSourceUrl() + '/users/:id', null, {
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
		return ServiceProviderService.get({id: id}, function(result){
			hateoas(result, function(){
				callback(result);
			});
		});
	}

	this.getAll = function(callback) {
		return ServiceProviderService.get( function(result){
			hateoas(result._embedded.serviceProviders);

			if(callback) callback(result);
		});
	}

	return this;
}]);