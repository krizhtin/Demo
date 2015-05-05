angular.module("mainSystemModule").factory('BdoAccountService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var BdoAccountService = r(d.getSourceUrl() + '/users/:id', null, {
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
		return BdoAccountService.get({id: id}, function(result){
			hateoas(result, function(){
				callback(result);
			});
		});
	}

	this.getAll = function(callback) {
		return BdoAccountService.get( function(result){
			hateoas(result._embedded.bdoAccounts);

			if(callback) callback(result);
		});
	}
	
	return this;
}]);