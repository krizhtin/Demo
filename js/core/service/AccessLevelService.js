angular.module("mainSystemModule").factory('AccessLevelService', ['$http', 'DataSource', '$resource', 'HateoasService', function(h, d, r, hateoas) {
	var AccessLevelService = r(d.getSourceUrl() + '/accessLevels/:id', null, {
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
		return AccessLevelService.get({id: id}, function(result){
			var findHateoas = {
				"parentAccessLevel":null
			};
			hateoas(result, findHateoas);
			if(success) success(result);
		}, function(result){
			if(error) error(result);
		});
	}

	this.getAllWithPageAndFilters = function(filters, success, error) {
		var searchColumn = filters["searchColumn"];
		var searchValue = filters["searchValue"];
		delete filters.searchColumn;
		delete filters.searchValue;
		filters[searchColumn] = searchValue;

		var AccessLevelSearch = r(d.getSourceUrl() + '/accessLevels/search/' + searchColumn + 'StartsWith', null, {
			query: {
				method: 'GET',
				isArray: false
			}
		});

		return AccessLevelSearch.query(filters, function(result){
			if(result.hasOwnProperty("_embedded")) {
				var findHateoas = {
					"createdBy":{
						callback:function(item, result) {
							item["createdByName"] = result.username;
						}
					},
					"modifiedBy":{
						callback:function(item, result) {
							item["modifiedByName"] = result.username;
						}
					},
					"parentAccessLevel": {
						callback:function(item, result) {	
							item["parentAccessLevelName"] = result.accessLevelName;
						}
					}
				};
				hateoas(result._embedded.accessLevels, findHateoas);
			}
			else result["_embedded"] = {"accessLevels":[]}; 

			if(success) success(result);
		}, function(result){
			if(error) error(result);
		});
	}

	this.getAll = function(success, error) {
		return AccessLevelService.get( function(result){
			hateoas(result._embedded.accessLevels);
			if(success) success(result);
		}, function(result){
			if(error) error(result);
		});
	}

	this.save = function(item, success, error) {
		var item = new AccessLevelService(item);
		item.$save(function(result){
			hateoas(result);
			if(success) success(result);
		}, function(result){
			if(error) error(result);
		});
	}
	this.update = function(item, success, error) {
		AccessLevelService.update({
			id: item.id
		}, item, function(result){
			hateoas(result);
			if(success) success(result);
		}, function(result){
			if(error) error(result);
		});
	}

	this.delete = function(item, success, error) {
		AccessLevelService.delete({id: item.id}, function(result) {
			if(success) success(result);
		}, function(result){
			if(error) error(result);
		});
	}

	return this;
}]);