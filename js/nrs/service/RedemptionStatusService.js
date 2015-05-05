angular.module("mainSystemModule").factory('RedemptinStatusService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var redemptionStatus = r(d.getSourceUrl() + '/redemptionStatuses/:id', null, {
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
		return redemptionStatus.get({id: id}, function(result){
			hateoas(result, function(){
				callback(result);
			});
		});
	}

	this.getAll = function(callback) {
		return redemptionStatus.get( function(result){
			hateoas(result._embedded.redemptionStatuses);

			if(callback) callback(result);
		});
	}
	
	return this;
}]);