(function (angular, storage) {

	var app = angular.module('bdo.login', []);

	app.factory('bdoStorage', [function () {

		return {
			get: function (key) {
				var item = storage.getItem(key);
				return JSON.parse(item);
			},
			set: function (key, value) {
				if (typeof value == 'object')
					value = JSON.stringify(value);
				storage.setItem(key, value);
			},
			clear: function () {
				storage.clear();
			},
			remove: function (key) {
				storage.removeItem(key);
			}
		};

	}])

	app.factory('bdoUser', ['bdoStorage', function (bdoStorage) {
		return {
			set: function (user) {
				bdoStorage.set('user', user);
			},
			get: function (key) {
				var user = bdoStorage.get('user');
				if (typeof key == 'string')
					return user[key];
				return user;
			},
			logout: function () {
				bdoStorage.remove('user');
			}
		};
	}])

})(angular, sessionStorage);
