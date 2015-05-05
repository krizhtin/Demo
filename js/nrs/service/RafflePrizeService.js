angular.module("mainSystemModule").factory('RafflePrizeService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var RafflePrizeService = r(d.getSourceUrl() + '/rafflePrizes/:id', null, {
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
		return RafflePrizeService.get( function(result){
			
			if(result.hasOwnProperty("_embedded")) {
				var findHateoas = {
					"createdBy":{
						callback:function(item, result) {
							item["createdBy"] = result.firstName;
						}
					},
					"rewardsProgram":{
						callback:function(item, result) {
							item["rewardsProgram"] = result.rewardsProgram;
						}
					}
				};
				hateoas(result._embedded.rafflePrizes, findHateoas);
			}
			else result["_embedded"] = {"rafflePrizes":[]}; 

			if(callback) callback(result);
		});
	}

	this.save = function(rafflePrize, callback) {
		var rafflePrize = new RafflePrizeService(rafflePrize);
		rafflePrize.$save(function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.update = function(rafflePrize, callback) {
		RafflePrizeService.update({
			id: rafflePrize.id
		}, rafflePrize, function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.delete = function(rafflePrize, callback) {
		RafflePrizeService.delete({id: rafflePrize.id}, function(result) {
			if(callback) callback(result);
		});
	}

	return this;
}]);