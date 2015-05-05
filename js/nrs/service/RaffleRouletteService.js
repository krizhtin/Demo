angular.module("mainSystemModule").factory('RaffleRouletteService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var RaffleRouletteService = r(d.getSourceUrl() + '/roulette/:id', null, {
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

	return this;
}]);


//just made this file to it won't be blank