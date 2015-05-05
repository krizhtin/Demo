angular.module("mainSystemModule").factory('ReferenceTableService', ['DataSource', '$resource', 'HateoasService', 'Upload', function(d, r, hateoas, up) {

	var ReferenceTableService = r(d.getSourceUrl() + '/appTables/:id', null, {
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

	this.getById = function(id, callback) {
		return ReferenceTableService.get({id: id}, function(result){
			hateoas(result, null, function(){
				callback(result);
			});
		});
	}

	this.getByUsername = function(id, callback) {
		return ReferenceTableService.get({id: id}, function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.getPageAppTableFieldsByAppTableId = function(appTableId, filters, success, error) {
		var ReferenceTableFieldsService = r(d.getSourceUrl() + '/appTableFields/search/findByAppTable', null, {
			query: {
				method: 'GET',
				isArray: false
			}
		});
		filters["appTable"] = appTableId;

		return ReferenceTableFieldsService.get(filters, function(result){
			if(!result.hasOwnProperty("_embedded")) {
				result["_embedded"] = {"appTableFields":[]}; 
			}	

			if(success) success(result);
		}, function(result){
			if(error) error(result);
		});
	}

	this.getPageAppTableValues = function(appTableModel, filters, success, error) {
		var ReferenceTableValuesService = r(d.getSourceUrl() + '/'+appTableModel, null, {
			query: {
				method: 'GET',
				isArray: false
			}
		});

		return ReferenceTableValuesService.get(filters, function(result){
			console.log("AppTable is ", result);
			if(!result.hasOwnProperty("_embedded")) {
				result["_embedded"] = null;
				result._embedded[appTableModel] = [];
			}

			if(success) success(result);
		}, function(result){
			if(error) error(result);
		});
	}

	this.saveAppTableValue = function(appTableModel, item, success, error) {
		var ReferenceTableValuesService = r(d.getSourceUrl() + '/'+appTableModel, null, {
			query: {
				method: 'GET',
				isArray: false
			}
		});

		var item = new ReferenceTableValuesService(item);
		item.$save(function(result){
			hateoas(result, null, function(){
				if(success) success(result);
			});
		});
	}

	this.uploadFileAppTableValues = function(files, success, error) {

		var Image = r(d.getSourceUrl() +'/v2/testing/upload', {id: "@_id"});

	    // Image.get(function(result) {
	    //     if (result.status != 'OK')
	    //         throw result.status;
	    // })
	    Image.save(files, function(result) {
            if (result.status != 'OK')
                throw result.status;

            console.log("Done!", result.data);
        });

        // if (files && files.length) {
        //     for (var i = 0; i < files.length; i++) {
        //         var file = files[i];
        //         up.upload({
        //             url: d.getSourceUrl() +'/v2/testing/upload',
        //             file: file
        //         }).success(function (data, status, headers, config) {
        //         	console.log("success", data);
        //             if(success) success(data);
        //         }).error(function(data, status, headers, config){
        //         	console.log("error", data);
        //         });
        //     }
        // }
    }

	this.getAllWithPageAndFilters = function(filters, success, error) {
		var searchColumn = filters["searchColumn"];
		var searchValue = filters["searchValue"];
		delete filters.searchColumn;
		delete filters.searchValue;
		filters[searchColumn] = searchValue;

		var ReferenceTableSearchService = r(d.getSourceUrl() + '/appTables/search/' + searchColumn + 'StartsWithIgnoreCase', null, {
			query: {
				method: 'GET',
				isArray: false
			}
		});

		return ReferenceTableSearchService.query(filters, function(result){
			if(result.hasOwnProperty("_embedded")) {
				var findHateoas = {
					"createdBy":{
						callback:function(item, result) {
							item["createdByName"] = result.username;
						}
					},
					"modifiedBy":{
						callback:function(item, result) {
							item["modifiedByName"] = result.username;
						}
					},
				};
				hateoas(result._embedded.appTables, findHateoas);
			}
			else result["_embedded"] = {"groups":[]}; 

			if(success) success(result);
		}, function(result){
			if(error) error(result);
		});
	}

	this.getAll = function(callback) {
		return ReferenceTableService.get( function(result){
			hateoas(result._embedded.appTables);

			if(callback) callback(result);
		});
	}

	this.getAllDropdown = function(callback) {
		console.log("2");
		return ReferenceTableService.get( function(result){
			// hateoas(result._embedded.appTables);
			
			if(result.hasOwnProperty("_embedded")) {
				var findHateoas = {
					"appTableFields":{
						callback:function(item, result) {
							if(result.hasOwnProperty("_embedded")) item["appTableFields"] = result._embedded.appTableFields;
							else item["appTableFields"] = [];
						}
					}
				};
				hateoas(result._embedded.appTables, findHateoas);
			} else result["_embedded"] = {"appTableFields":[]}; 

			if(callback) callback(result);
		});
	}

	this.save = function(item, callback) {
		var item = new ReferenceTableService(item);
		item.$save(function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.update = function(item, callback) {
		ReferenceTableService.update({
			id: item.id
		}, item, function(result){
			hateoas(result);
			if(callback) callback(result);
		});
	}

	this.delete = function(item, callback) {
		ReferenceTableService.delete({id: item.id}, function(result) {
			if(callback) callback(result);
		});
	}

	return this;
}]);