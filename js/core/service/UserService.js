angular.module("mainSystemModule").factory('UserService', ['DataSource', '$resource', 'HateoasService', 'BankService', function(d, r, hateoas, b) {
	var thisService = this;
	var UserService = r(d.getSourceUrl() + '/users/:id', null, {
		query: {
			method: 'GET',
			isArray: false
		},
		update: {
			method: 'POST'
		},
		delete: {
            method: 'DELETE',
            params: {
                id:"@id"
            }
        }
	});

	this.getById = function(id, success, error) {
		return UserService.get({id: id}, function(result){
			var findHateoas = {
				"banks":null,
				"groups":null,
				"accessLevel":null
			};
			hateoas(result, findHateoas, function(){
				if(success) success(result);
			});
		});
	}

	this.getByUsername = function(id, success, error) {
		return UserService.get({id: id}, function(result){
			hateoas(result);
			if(success) success(result);
		});
	}

	this.getAllWithPageAndFilters = function(filters, success, error) {
		var searchColumn = filters["searchColumn"];
		var searchValue = filters["searchValue"];
		delete filters.searchColumn;
		delete filters.searchValue;
		filters[searchColumn] = searchValue;

		var UserServiceSearch = r(d.getSourceUrl() + '/users/search/' + searchColumn + 'StartsWithIgnoreCase', null, {
			query: {
				method: 'GET',
				isArray: false
			}
		});

		return UserServiceSearch.query(filters, function(result){
			if(result.hasOwnProperty("_embedded")) {
				var findHateoas = {
					"createdBy":{
						callback:function(item, result) {
							item["createdByName"] = result.nameSuffix;
						}
					},
					"modifiedBy":{
						callback:function(item, result) {
							item["modifiedByName"] = result.username;
						}
					},
					"accessLevel":{
						callback:function(item, result) {
							item["accessLevelName"] = result.accessLevelName;
						}
					},
					"groups":{
						callback:function(item, result) {
							if(result.hasOwnProperty("_embedded")) {
								$.each(result._embedded.groups, function(idx, value){
									if(item["groupsList"]) {
										item["groupsList"] += ", "+value.groupName;
									}
									else {
										item["groupsList"] = ""+value.groupName;
									}
								});
							}
							else {
								item["groupsList"] = "";
							}
						}
					}

				};
				hateoas(result._embedded.users, findHateoas, function(){	
					if(success) success(result);
				});
			}
			else {
				result["_embedded"] = {"users":[]}; 
				if(success) success(result);
			}
		}, function(result){
			if(error) error(result);
		});
	}

	this.save = function(item, success, error) {
		var item = new UserService(item);
		item.$save(function(result){
			// hateoas(result);
			if(success) success(result);
		});
	}

	this.update = function(item, success, error) {
		UserService.update({
			id: item.id
		}, item, function(result){
			// hateoas(result);
			if(success) success(result);
		});
	}

	this.delete = function(item, success, error) {
		UserService.delete({id: item.id}, function(result) {
			if(success) success(result);
		});
	}

	// this.getAllUserBanks = function(user, success, error) {
	// 	var UserBanksService = r(d.getSourceUrl() + '/users/' + user.id + '/banks', null, {
	// 		query: {
	// 			method: 'GET',
	// 			isArray: false
	// 		}
	// 	});

	// 	console.log("UserID is ", user.id);
	// 	return UserBanksService.query({
	// 		user_id: user.id
	// 	}, function(result){
	// 		hateoas(result._embedded.userBanks);
	// 		if(success) success(result);
	// 	});
	// }

	// this.getAllUserGroups = function(user, success, error) {
	// 	var UserGroupsService = r(d.getSourceUrl() + '/users/' + user.id + '/userGroups', null, {
	// 		query: {
	// 			method: 'GET',
	// 			isArray: false
	// 		}
	// 	});
	// 	console.log("UserID is ", user.id);
	// 	return UserGroupsService.query({
	// 		user_id: user.id
	// 	}, function(result){
	// 		if(success) success(result);
	// 	});
	// }

	// this.addBankToUser = function (user, bank, success, error) {
	// 	var UserBanks = new UserBanksService({
	// 		"bank":bank._links.self.href,
	// 		"user":user._links.self.href,
	// 		"status":"Active"
	// 	});

	// 	console.log(UserBanks);
	// 	UserBanks.$save(function(result){
	// 		success(result);
	// 	});
	// }

	// this.addGroupToUser = function (user, group, success, error) {
	// 	var UserGroups = new UserGroupsService({
	// 		"group":group._links.self.href,
	// 		"user":user._links.self.href,
	// 		"status":"Active"
	// 	});

	// 	console.log(UserGroups);
	// 	UserGroups.$save(function(result){
	// 		success(result);
	// 	});
	// }

	return this;
}]);