angular.module("mainSystemModule").factory('ItemCategoryService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var ItemCategory = r(d.getSourceUrl() + '/users/:id', null, {
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
		return ItemCategoryService.get({id: id}, function(result){
			hateoas(result, function(){
				callback(result);
			});
		});
	}

	this.getAll = function(callback) {
		return ItemCategoryService.get( function(result){
			hateoas(result._embedded.itemCategories);

			if(callback) callback(result);
		});
	}

	return this;
}]);