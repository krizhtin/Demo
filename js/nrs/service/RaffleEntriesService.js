angular.module("mainSystemModule").factory('RaffleEntriesService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var RaffleEntriesService = r(d.getSourceUrl() + '/raffleEntries/:id', null, {
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
		return RaffleEntriesService.get( function(result){
			hateoas(result._embedded.raffleEntries);

			if(callback) callback(result);
		});
	}

	this.save = function(raffleEntries, callback) {
		var raffleEntries = new RaffleEntriesService(raffleEntries);
		raffleEntries.$save(function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.update = function(raffleEntries, callback) {
		RaffleEntriesService.update({
			id: raffleEntries.id
		}, raffleEntries, function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.delete = function(raffleEntries, callback) {
		RaffleEntriesService.delete({id: raffleEntries.id}, function(result) {
			if(callback) callback(result);
		});
	}

	return this;
}]);