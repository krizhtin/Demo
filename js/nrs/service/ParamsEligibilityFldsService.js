angular.module("mainSystemModule").factory('ParamsEligibilityFldsService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var ParamsEligibilityFldsService = r(d.getSourceUrl() + '/paramsEligibilityFlds/:id', null, {
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
		return ParamsEligibilityFldsService.get( function(result){
			
			if(result.hasOwnProperty("_embedded")) {
				var findHateoas = {
					"paramsEligibilityTable":{
						callback:function(item, result) {
							item["tableName"] = result.tableName;
						}
					}
				};
				hateoas(result._embedded.paramsEligibilityFlds, findHateoas);
			}
			else result["_embedded"] = {"paramElibilityTable":[]}; 
			

			if(callback) callback(result);
		});
	}
	
	this.save = function(paramsEligibility, callback) {
		var paramsEligibility = new ParamsEligibilityFldsService(paramsEligibility);
		paramsEligibility.$save(function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.update = function(paramsEligibility, callback) {
		ParamsEligibilityFldsService.update({
			id: paramsEligibility.id
		}, paramsEligibility, function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.delete = function(paramsEligibility, callback) {
		ParamsEligibilityFldsService.delete({id: paramsEligibility.id}, function(result) {
			if(callback) callback(result);
		});
	}

	return this;
}]);