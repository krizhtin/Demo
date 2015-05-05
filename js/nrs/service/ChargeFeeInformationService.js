angular.module("mainSystemModule").factory('ChargeFeeInformationService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var ChargeFeeInformationService = r(d.getSourceUrl() + '/chargeFeeInformations/:id', null, {
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
		return ChargeFeeInformationService.get({id: id}, function(result){
			hateoas(result, function(){
				callback(result);
			});
		});
	}

	this.getAllWithFilter = function(search, page, size, sort, sorttype, callback) {
		var ChargeFeeInformationServiceSearch = r(d.getSourceUrl() + '/chargeFeeInformations/search/' + search.column + 'StartsWithIgnoreCase', null, {
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

		return ChargeFeeInformationServiceSearch.query(filters, function(result){
			console.log("filters : ",result);
			hateoas(result._embedded.chargeFeeInformations);
			if(callback) callback(result);
		});
	}

	this.getAll = function(callback) {
		return ChargeFeeInformationService.get( function(result){
			hateoas(result._embedded.chargeFeeInformations);

			if(callback) callback(result);
		});
	}

	this.save = function(chargeFeeInformation, callback) {
		var rewardsprogram = new ChargeFeeInformationService(chargeFeeInformation);
		rewardsprogram.$save(function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.update = function(chargeFeeInformation, callback) {
		ChargeFeeInformationService.update({
			id: chargeFeeInformation.id
		}, chargeFeeInformation, function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.delete = function(chargeFeeInformation, callback) {
		ChargeFeeInformationService.delete({id: chargeFeeInformation.id}, function(result) {
			if(callback) callback(result);
		});
	}
	
	return this;
}]);