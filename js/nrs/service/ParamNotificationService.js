angular.module("mainSystemModule").factory('ParamNotificationService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var ParamNotificationService = r(d.getSourceUrl() + '/paramNotifications/:id', null, {
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
		return ParamNotificationService.get( function(result){
			hateoas(result._embedded.paramNotifications);

			if(callback) callback(result);
		});
	}

	this.save = function(paramNotification, callback) {
		var paramNotification = new ParamNotificationService(paramNotification);
		paramNotification.$save(function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.update = function(paramNotification, callback) {
		ParamNotificationService.update({
			id: paramNotification.id
		}, paramNotification, function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.delete = function(paramNotification, callback) {
		ParamNotificationService.delete({id: paramNotification.id}, function(result) {
			if(callback) callback(result);
		});
	}

	return this;
}]);