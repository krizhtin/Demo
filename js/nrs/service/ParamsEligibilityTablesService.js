angular.module("mainSystemModule").factory('ParamsEligibilityTablesService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var ParamsEligibilityTablesService = r(d.getSourceUrl() + '/paramsEligibilityTables/:id', null, {
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
		return ParamsEligibilityTablesService.get( function(result){
			hateoas(result._embedded.paramsEligibilityTables);

			if(callback) callback(result);
		});
	}

	this.save = function(paramsEligibilityTable, callback) {
		var paramsEligibilityTable = new ParamsEligibilityTablesService(paramsEligibilityTable);
		paramsEligibilityTable.$save(function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.update = function(paramsEligibilityTable, callback) {
		ParamsEligibilityTablesService.update({
			id: paramsEligibilityTable.id
		}, paramsEligibilityTable, function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.delete = function(paramsEligibilityTable, callback) {
		ParamsEligibilityTablesService.delete({id: paramsEligibilityTable.id}, function(result) {
			if(callback) callback(result);
		});
	}

	return this;
}]);