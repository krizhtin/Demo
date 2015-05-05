angular.module("mainSystemModule").factory('RewardItemService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var RewardItemService = r(d.getSourceUrl() + '/rewardItems/:id', null, {
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
		return RewardItemService.get({id: id}, function(result){
			hateoas(result._embedded.rewardItems);

			if(callback) callback(result);
		});
	}

	this.getAll = function(callback) {
		return RewardItemService.get( function(result){
			hateoas(result._embedded.rewardItems);

			if(callback) callback(result);
		});
	}

	this.save = function(rewardItem, callback) {
		var rewardItem = new RewardItemService(rewardItem);
		rewardItem.$save(function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.update = function(rewardItem, callback) {
		RewardItemService.update({
			id: rewardItem.id
		}, rewardItem, function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.delete = function(rewardItem, callback) {
		RewardItemService.delete({id: rewardItem.id}, function(result) {
			if(callback) callback(result);
		});
	}

	return this;
}]);