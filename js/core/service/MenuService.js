angular.module("mainSystemModule").factory('MenuService', ['$http', 'DataSource', '$resource', 'HateoasService', function(h, d, r, hateoas) {
	var MenuService = r(d.getSourceUrl() + '/menus/:id', null, {
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

	this.getAllWithPage = function(filters, success, error) {
		return MenuService.query(filters, function(result){
			if(result.hasOwnProperty("_embedded")) {
				hateoas(result._embedded.menus);
			}
			else result["_embedded"] = {"menus":[]}; 

			if(success) success(result);
		}, function(result){
			if(error) error(result);
		});
	}

	return this;
}]);