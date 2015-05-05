angular.module("mainSystemModule").factory('ParamsCndtnFldsService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var ParamsCndtnFldsService = r(d.getSourceUrl() + '/paramsCndtnFlds/:id', null, {
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
		return ParamsCndtnFldsService.get( function(result){
			
			if(result.hasOwnProperty("_embedded")) {
				var findHateoas = {
					"paramsCndtnTable":{
						callback:function(item, result) {
							item["tableName"] = result.tableName;
						}
					}
				};
				hateoas(result._embedded.paramsCndtnFlds, findHateoas);
			}
			else result["_embedded"] = {"paramElibilityTable":[]}; 

			if(callback) callback(result);
		});
	}

	this.save = function(paramsCndtnFld, callback) {
		var paramsCndtnFld = new ParamsCndtnFldsService(paramsCndtnFld);
		paramsCndtnFld.$save(function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.update = function(paramsCndtnFld, callback) {
		ParamsCndtnFldsService.update({
			id: paramsCndtnFld.id
		}, paramsCndtnFld, function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.delete = function(paramsCndtnFld, callback) {
		ParamsCndtnFldsService.delete({id: paramsCndtnFld.id}, function(result) {
			if(callback) callback(result);
		});
	}

	return this;
}]);