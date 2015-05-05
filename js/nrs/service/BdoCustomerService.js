angular.module("mainSystemModule").factory('BdoCustomerService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var BdoCustomer = r(d.getSourceUrl() + '/users/:id', null, {
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
		return BdoCustomerService.get({id: id}, function(result){
			hateoas(result, function(){
				callback(result);
			});
		});
	}

	this.getAll = function(callback) {
		return BdoCustomerService.get( function(result){
			hateoas(result._embedded.bdoCustomers);

			if(callback) callback(result);
		});
	}
	
	return this;
}]);