angular.module("mainSystemModule").factory('ProductService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var ProductService = r(d.getSourceUrl() + '/users/:id', null, {
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
		return ProductService.get({id: id}, function(result){
			hateoas(result, function(){
				callback(result);
			});
		});
	}

	this.getAll = function(callback) {
		return ProductService.get( function(result){
			hateoas(result._embedded.products);

			if(callback) callback(result);
		});
	}

	return this;
}]);