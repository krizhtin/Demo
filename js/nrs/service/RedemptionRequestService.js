angular.module("mainSystemModule").factory('RedemptionRequestService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var RedemptionRequestService = r(d.getSourceUrl() + '/redemptionRequests/:id', null, {
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

	this.getById = function(id, success, error) {
		return RedemptionRequestService.get({id: id}, function(result){
			var findHateoas = {
				"bdoAccount":{
					callback:function(item, result) {
						item["accName1"] = result.accName1;
						item["account"] = result.account;
					}
				},
				"bdoCard":{
					callback:function(item, result) {
						item["cardNbr"] = result.cardNbr;
					}
				},
				"rewardItem":{
					callback:function(item, result) {
						item["itemCode"] = result.itemCode;
						item["itemDesc"] = result.itemDesc;
					}
				},
				"redemptionStatus":{
					callback:function(item, result) {
						item["rdmstatDesc"] = result.rdmstatDesc;
					}
				},
				"rdmptnTypes":{
					callback:function(item, result) {
						item["rdmptnType"] = result.rdmptnType;
					}
				},
				"modifiedBy":{
					callback:function(item, result) {
						item["modifiedName"] = result.fullName;						
					}
				},
				"createdBy":{
					callback:function(item, result) {
						item["createdName"] = result.fullName;						
					}
				}			
			};
			hateoas(result, findHateoas);
			
			if(success) success(result);
		});
	}

	this.getAllWithPageAndFilters = function(filters, success, error) {
		var searchColumn = filters["searchColumn"];
		var searchValue = filters["searchValue"];
		delete filters.searchColumn;
		delete filters.searchValue;
		filters[searchColumn] = searchValue;
		
		var RedemptionRequestService = r(d.getSourceUrl() + '/redemptionRequests/search/' + searchColumn + 'StartsWithIgnoreCase', null, {
			query: {
				method: 'GET',
				isArray: false
			}
		});				

		return RedemptionRequestService.query(filters, function(result){
			if(result.hasOwnProperty("_embedded")) {
				var findHateoas = {
					"bdoAccount":{
						callback:function(item, result) {
							item["accName1"] = result.accName1;
							item["account"] = result.account;
						}
					},
					"bdoCard":{
						callback:function(item, result) {
							item["cardNbr"] = result.cardNbr;
						}
					},
					"rewardItem":{
						callback:function(item, result) {
							item["itemCode"] = result.itemCode;
							item["itemDesc"] = result.itemDesc;
						}
					},
					"redemptionStatus":{
						callback:function(item, result) {
							item["rdmstatDesc"] = result.rdmstatDesc;
						}
					},
					"rdmptnTypes":{
						callback:function(item, result) {
							item["rdmptnType"] = result.rdmptnType;
						}
					},
					"modifiedBy":{
						callback:function(item, result) {
							item["modifiedName"] = result.fullName;						
						}
					},
					"createdBy":{
						callback:function(item, result) {
							item["createdName"] = result.fullName;						
						}
					}			
				};
				hateoas(result._embedded.redemptionRequests, findHateoas);
			}
			else result["_embedded"] = {"redemptionRequests":[]}; 

			if(success) success(result);
		}, function(result){
			if(error) error(result);
		});
	}


	this.getAll = function(callback) {
		return RedemptionRequestService.get( function(result){
			if(result.hasOwnProperty("_embedded")) {
				var findHateoas = {
					"bdoAccount":{
						callback:function(item, result) {
							item["accName1"] = result.accName1;
							item["account"] = result.account;
						}
					},
					"bdoCard":{
						callback:function(item, result) {
							item["cardNbr"] = result.cardNbr;
						}
					},
					"rewardItem":{
						callback:function(item, result) {
							item["itemCode"] = result.itemCode;
							item["itemDesc"] = result.itemDesc;
						}
					},
					"redemptionStatus":{
						callback:function(item, result) {
							item["rdmstatDesc"] = result.rdmstatDesc;
						}
					},
					"rdmptnTypes":{
						callback:function(item, result) {
							item["rdmptnType"] = result.rdmptnType;
						}
					},
					"modifiedBy":{
						callback:function(item, result) {
							item["modifiedName"] = result.fullName;						
						}
					},
					"createdBy":{
						callback:function(item, result) {
							item["createdName"] = result.fullName;						
						}
					}			
				};
				hateoas(result._embedded.redemptionRequests, findHateoas);
			}
			else hateoas(result._embedded.redemptionRequests);

			if(callback) callback(result);
		});
	}

	this.save = function(redemptionRequest, callback) {
		var rewardsprogram = new RedemptionRequestService(redemptionRequest);
		rewardsprogram.$save(function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.update = function(redemptionRequest, callback) {
		RedemptionRequestService.update({
			id: redemptionRequest.id
		}, redemptionRequest, function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.delete = function(redemptionRequest, callback) {
		RedemptionRequestService.delete({id: redemptionRequest.id}, function(result) {
			if(callback) callback(result);
		});
	}
	
	return this;
}]);