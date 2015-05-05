angular.module("mainSystemModule").factory('FormRewardService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var FormRewardService = r(d.getSourceUrl() + '/formRewards/:id', null, {
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
		return FormRewardService.get( function(result){
			
			hateoas(result._embedded.formRewards);

			if(callback) callback(result);
		});
	}

	this.save = function(paramsCndtnFld, callback) {
		var paramsCndtnFld = new FormRewardService(paramsCndtnFld);
		paramsCndtnFld.$save(function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.update = function(paramsCndtnFld, callback) {
		FormRewardService.update({
			id: paramsCndtnFld.id
		}, paramsCndtnFld, function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.delete = function(paramsCndtnFld, callback) {
		FormRewardService.delete({id: paramsCndtnFld.id}, function(result) {
			if(callback) callback(result);
		});
	}

	return this;
}]);