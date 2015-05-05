angular.module("mainSystemModule").factory('PushNotificationService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var PushNotificationService = r(d.getSourceUrl() + '/pushNotifications/:id', null, {
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
		return PushNotificationService.get({id: id}, function(result){
			hateoas(result, function(){
				callback(result);
			});
		});
	}

	this.getAllWithFilter = function(search, page, size, sort, sorttype, callback) {
		var PushNotificationServiceSearch = r(d.getSourceUrl() + '/pushNotifications/search/' + search.column + 'StartsWithIgnoreCase', null, {
			query: {
				method: 'GET',
				isArray: false
			}
		});

		var filters = {
			page: page,
			size: size,
			sort: sort + "," + sorttype
		};
		console.log("search:: ", search);
		filters[search.column] = search.value;

		return PushNotificationServiceSearch.query(filters, function(result){
			console.log("filters : ",result);
			hateoas(result._embedded.pushNotifications);
			if(callback) callback(result);
		});
	}

	this.getAll = function(callback) {
		return PushNotificationService.get( function(result){
			hateoas(result._embedded.pushNotifications);

			if(callback) callback(result);
		});
	}

	this.save = function(pushNotification, callback) {
		var rewardsprogram = new PushNotificationService(pushNotification);
		rewardsprogram.$save(function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.update = function(pushNotification, callback) {
		PushNotificationService.update({
			id: pushNotification.id
		}, pushNotification, function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.delete = function(pushNotification, callback) {
		PushNotificationService.delete({id: pushNotification.id}, function(result) {
			if(callback) callback(result);
		});
	}
	
	return this;
}]);