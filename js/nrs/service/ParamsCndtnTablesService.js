angular.module("mainSystemModule").factory('ParamsCndtnTablesService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var ParamsCndtnTablesService = r(d.getSourceUrl() + '/paramsCndtnTables/:id', null, {
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

	this.getAll = function(callback) {
		return ParamsCndtnTablesService.get( function(result){
			hateoas(result._embedded.paramsCndtnTables);

			if(callback) callback(result);
		});
	}

	this.save = function(paramsCndtnTable, callback) {
		var paramsCndtnTable = new ParamsCndtnTablesService(paramsCndtnTable);
		paramsCndtnTable.$save(function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.update = function(paramsCndtnTable, callback) {
		ParamsCndtnTablesService.update({
			id: paramsCndtnTable.id
		}, paramsCndtnTable, function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.delete = function(paramsCndtnTable, callback) {
		ParamsCndtnTablesService.delete({id: paramsCndtnTable.id}, function(result) {
			if(callback) callback(result);
		});
	}

	return this;
}]);