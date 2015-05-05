angular.module("mainSystemModule").factory('GroupService', ['$http', 'DataSource', '$resource', 'HateoasService', function(h, d, r, hateoas) {

	var GroupService = r(d.getSourceUrl() + '/groups/:id', null, {
		query: {
			method: 'GET',
			isArray: false
		},
		update: {
			method: 'PUT'
		}
	});

	this.getById = function(id, callback) {
		return GroupService.get({id: id}, function(result){
			hateoas(result, function(){
				if(callback) callback(result)
			});
		});
	}

	this.getAllWithFilter = function(page, size, sort, sorttype, others, callback) {
		return GroupService.query($.extend({
			page: page,
			size: size,
			sort: sort + "," + sorttype
		}, others), function(result){
			hateoas(result._embedded.groups, function(){
				if(callback) callback(result);
			});
		});
	}

	this.getAllWithPageAndFilters = function(filters, success, error) {
		var searchColumn = filters["searchColumn"];
		var searchValue = filters["searchValue"];
		delete filters.searchColumn;
		delete filters.searchValue;
		filters[searchColumn] = searchValue;

		var GroupSearchService = r(d.getSourceUrl() + '/groups/search/' + searchColumn + 'StartsWith', null, {
			query: {
				method: 'GET',
				isArray: false
			}
		});

		return GroupSearchService.query(filters, function(result){
			if(result.hasOwnProperty("_embedded")) {
				var findHateoas = {};
				hateoas(result._embedded.groups, findHateoas);
			}
			else result["_embedded"] = {"groups":[]}; 

			if(success) success(result);
		}, function(result){
			if(error) error(result);
		});
	}

	this.getAll = function(callback) {
		return GroupService.get( function(result){
			//hateoas(result._embedded.groups);
			callback(result);
		});
	}

	this.save = function(group, callback) {
		var group = new GroupService(group);
		group.$save(function(result){
			hateoas(result, function(){
				if(callback) callback(result)
			});
		});
	}

	this.update = function(group, callback) {
		GroupService.update({
			id: group.id
		}, group, function(result){
			hateoas(result, function(){
				if(callback) callback(result)
			});
		});
	}

	return this;
}]);