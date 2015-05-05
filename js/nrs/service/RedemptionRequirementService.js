angular.module("mainSystemModule").factory('RedemptionRequirementService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var RedemptionRequirementService = r(d.getSourceUrl() + '/redemptionRequirements/:id', null, {
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
		return RedemptionRequirementService.get({id: id}, function(result){
			hateoas(result, function(){
				callback(result);
			});
		});
	}

	this.getAllWithPageAndFilters = function(filters, success, error) {
		var searchColumn = filters["searchColumn"];
		var searchValue = filters["searchValue"];
		delete filters.searchColumn;
		delete filters.searchValue;
		filters[searchColumn] = searchValue;

		var RedemptionRequirementService = r(d.getSourceUrl() + '/redemptionRequirements/search/' + searchColumn + 'StartsWithIgnoreCase', null, {
			query: {
				method: 'GET',
				isArray: false
			}
		});

		return RedemptionRequirementService.query(filters, function(result){
			if(result.hasOwnProperty("_embedded")) {
				var findHateoas = {
					"rewardItem":{
						callback:function(item, result) {
							item["itemCode"] = result.itemCode;
						}
					},	
					"bdoAccount":{
						callback:function(item, result) {
							item["account"] = result.account;
						}
					},
					"bdoAccount":{
						callback:function(item, result) {
							item["accName1"] = result.accName1;
						}
					}		
				};
				hateoas(result._embedded.redemptionRequirements, findHateoas);
			}
			else result["_embedded"] = {"redemptionRequirements":[]}; 

			if(success) success(result);
		}, function(result){
			if(error) error(result);
		});
	}


	this.getAll = function(callback) {
		return RedemptionRequirementService.get( function(result){
			hateoas(result._embedded.redemptionRequirements);

			if(callback) callback(result);
		});
	}

	this.save = function(redemptionRequirement, callback) {
		var rewardsprogram = new RedemptionRequirementService(redemptionRequirement);
		rewardsprogram.$save(function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.update = function(redemptionRequirement, callback) {
		RedemptionRequirementService.update({
			id: redemptionRequirement.id
		}, redemptionRequirement, function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.delete = function(redemptionRequirement, callback) {
		RedemptionRequirementService.delete({id: redemptionRequirement.id}, function(result) {
			if(callback) callback(result);
		});
	}
	
	return this;
}]);