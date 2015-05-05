angular.module("mainSystemModule").factory('CardProfileService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var CardProfileService = r(d.getSourceUrl() + '/users/:id', null, {
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
		return CardProfileService.get({id: id}, function(result){
			hateoas(result, function(){
				callback(result);
			});
		});
	}

	this.getAll = function(callback) {
		return CardProfileService.get( function(result){
			hateoas(result._embedded.cardProfiles);

			if(callback) callback(result);
		});
	}

	return this;
}]);