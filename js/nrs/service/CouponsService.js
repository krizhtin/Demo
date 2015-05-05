angular.module("mainSystemModule").factory('CouponsService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var CouponsService = r(d.getSourceUrl() + '/coupons/:id', null, {
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
		return CouponsService.get({id: id}, function(result){
			hateoas(result, function(){
				callback(result);
			});
		});
	}

	this.getByCardNbr = function(id, callback) {
		return CouponsService.get({id: id}, function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.getAllWithPageAndFilters = function(filters, success, error) {
		var searchColumn = filters["searchColumn"];
		var searchValue = filters["searchValue"];
		delete filters.searchColumn;
		delete filters.searchValue;
		filters[searchColumn] = searchValue;

		var CouponsService = r(d.getSourceUrl() + '/coupons/search/' + searchColumn + 'StartsWithIgnoreCase', null, {
			query: {
				method: 'GET',
				isArray: false
			}
		});

		return CouponsService.query(filters, function(result){
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

	this.getAll = function(callback) {
		return CouponsService.get( function(result){
			hateoas(result._embedded.coupons);

			if(callback) callback(result);
		});
	}

	this.update = function(coupons, callback) {
		CouponsService.update({
			id: coupons.id
		}, user, function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.save = function(item, success, error) {
		var item = new CouponsService(item);
		item.$save(function(result){
			// hateoas(result);
			if(success) success(result);
		});
	}

	return this;
}]);