angular.module("mainSystemModule").factory('CatalogueService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var CatalogueService = r(d.getSourceUrl() + '/catalogues/:id', null, {
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

	this.getAllWithPageAndFilters = function(filters, success, error) {
		var searchColumn = filters["searchColumn"];
		var searchValue = filters["searchValue"];
		delete filters.searchColumn;
		delete filters.searchValue;
		filters[searchColumn] = searchValue;

		var CatalogueService = r(d.getSourceUrl() + '/catalogue/search/' + searchColumn + 'StartsWithIgnoreCase', null, {
			query: {
				method: 'GET',
				isArray: false
			}
		});

		return CatalogueService.query(filters, function(result){
			if(result.hasOwnProperty("_embedded")) {
				var findHateoas = {
					"rewardItems":{
						callback:function(item, result) {
							item["itemCode"] = result.itemCode;
						}
					},	
					"bdoAccount":{
						callback:function(item, result) {
							item["account"] = result.account;
							item["accName1"] = result.accName1;
						}
					},
					"bdoCard":{
						callback:function(item, result) {
							item["cardNbr"] = result.cardNbr;						}
					},
					"bank":{
						callback:function(item, result) {
							item["bankName"] = result.bankName;
						}
					}
				};
				hateoas(result._embedded.coupons, findHateoas);
			}
			else result["_embedded"] = {"coupons":[]}; 

			if(success) success(result);
		}, function(result){
			if(error) error(result);
		});
	}

	this.getById = function(id, callback) {
		return CatalogueService.get({id: id}, function(result){
			hateoas(result, function(){
				callback(result);
			});
		});
	}

	this.getAll = function(callback) {
		return CatalogueService.get( function(result){
			hateoas(result._embedded.catalogues);

			if(callback) callback(result);
		});
	}

	this.save = function(catalogue, callback) {
		var catalogue = new Catalogue(catalogue);
		catalogue.$save(function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.update = function(catalogue, callback) {
		CatalogueService.update({
			id: catalogue.id
		}, catalogue, function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.delete = function(catalogue, callback) {
		CatalogueService.delete({id: catalogue.id}, function(result) {
			if(callback) callback(result);
		});
	}

	return this;
}]);