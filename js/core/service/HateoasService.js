angular.module("mainSystemModule").factory('HateoasService', ['HateoasInterface', function(hi) {
	var HateoasService = function(items, props, success, error) {
		if($.isArray(items)) {
			$.each(items, function(index, item){
				getResource(item);
			});
		}
		else {
			getResource(items);
		}

		function getResource(item) {
			var lastIndex = item._links.self.href.lastIndexOf("/")+1;
			item.id = item._links.self.href.slice(lastIndex);

			if(!props) {
				async.each(Object.keys(item._links), function(link, callback){
					item[link] = new hi(item).resource(link).get(null, function(result) {callback();});
				}, function(result){
					if(success) success(result);
				});
			}
			else {
				async.each(Object.keys(props), function(link, callback){
					if(item._links.hasOwnProperty(link)) {
						item[link] = new hi(item).resource(link).get(null, function(result) {
							if(props[link] && props[link].callback) props[link].callback(item, result);
							callback();
						});
					}
					else {
						callback();
					}
					
				}, function(result){
					if(success) success();
				});
			}
		}
	}

	return HateoasService;
}]);