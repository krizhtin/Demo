mainSystemModule.directive('nzDatatable', [function() {
	return {
		restrict: 'E',
		link: function (scope, element, attrs) {
			console.log("Scope : ", scope);
			console.log("Element : ", element);
			console.log("Attribute : ", attrs);
		},
		controller: 'nzDatatableController',
		templateUrl: "../_lib/template/core_nz_datatable.html",
		replace: true
	};
}]);

mainSystemModule.controller('nzDatatableController', ['$scope', function(s){
	// s.gotoPreviousPage = function() {
	// 	s.$parent.gotoPreviousPage();
	// }
	// s.gotoNextPage = function() {
	// 	s.$parent.gotoNextPage();
	// }
	// s.goToPage = function (pagenum) {
	// 	s.goToPage = s.$parent.goToPage;
	// }
}]);