angular.module("mainSystemModule").factory('ItemRdmptnReqmntService', ['DataSource', '$resource', 'HateoasService', function(d, r, hateoas) {
	var ItemRdmptnReqmntService = r(d.getSourceUrl() + '/users/:id', null, {
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
		return ItemRdmptnReqmntService.get({id: id}, function(result){
			hateoas(result, function(){
				callback(result);
			});
		});
	}

	this.getAll = function(callback) {
		return ItemRdmptnReqmntService.get( function(result){
			hateoas(result._embedded.itemRdmptnReqmnts);

			if(callback) callback(result);
		});
	}

	this.save = function(itemRdmptnReqmnt, callback) {
		var itemRdmptnReqmnt = new ItemRdmptnReqmntService(rewardItem);
		itemRdmptnReqmnt.$save(function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.update = function(itemRdmptnReqmnt, callback) {
		ItemRdmptnReqmntService.update({
			id: itemRdmptnReqmnt.id
		}, itemRdmptnReqmnt, function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.delete = function(itemRdmptnReqmnt, callback) {
		ItemRdmptnReqmntService.delete({id: itemRdmptnReqmnt.id}, function(result) {
			if(callback) callback(result);
		});
	}

	return this;
}]);