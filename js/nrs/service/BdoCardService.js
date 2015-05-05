angular.module("mainSystemModule").factory('BdoCardService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var BdoCardService = r(d.getSourceUrl() + '/bdoCards/:id', null, {
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
		return BdoCardService.get({id: id}, function(result){
			hateoas(result, function(){
				callback(result);
			});
		});
	}

	this.getAll = function(callback) {
		return BdoCardService.get( function(result){
			hateoas(result._embedded.bdoCards);

			if(callback) callback(result);
		});
	}
	
	return this;
}]);