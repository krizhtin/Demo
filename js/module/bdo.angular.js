(function (angular) {

	var app = angular.module('bdo.angular', []);

	app.directive('bdoTable', function () {
		return {
			restrict: 'AE',
			replace: true,
			scope: {
				columns: '=',
				data: '=',
				actions: '=',
				action: '=',
				pageInfo: '=',
				selectlist: '=',
				tableMenu: '='
			},
			controller: 'BdoTableController',
			templateUrl: 'js/template/bdo-table.html',
			compile: function compile( tElement, tAttributes ) {
				console.log( tAttributes.log + ' (compile)'  );
				return {
					post: function postLink( scope, element, attributes ) {
						// element.find("select.selectpicker").selectpicker();
					}
				};
			}
		};		
	});

	app.controller('BdoTableController', ['$scope', function ($scope) {

        $scope.convertToFormatDate = function(date) {
            return dateWithTimeReformatter(new Date(date));
        }

		$scope.view = function (index, row) {
			$scope.tableMenu.row.view(index, row);
		};
		$scope.edit = function (index, row) {
			$scope.tableMenu.row.edit(index, row);
		};
		$scope.delete = function (index, row) {
			$scope.tableMenu.row.delete(index, row);
		};

                if ($scope.pageInfo) {
                    $scope.perPage = 10;

                    $scope.$watch('perPage', function (newValue, oldValue) {
                            $scope.tableMenu.pagination.perPage(newValue);
                    });

                    $scope.next = function () {
                            if (!$scope.pageInfo.last)
                                    $scope.tableMenu.pagination.next();
                    };

                    $scope.previous = function () {
                            if (!$scope.pageInfo.first)
                                    $scope.tableMenu.pagination.previous();
                    };

                    $scope.gotoPage = function (page) {
                            if (page != $scope.pager.active) {
                                    $scope.pager.active = page;
                                    $scope.tableMenu.pagination.page(page);
                            }
                    };

                    $scope.sort = function (field) {
                            $scope.tableMenu.sort(field);
                    };

                    $scope.$watch('pageInfo', function () {
                            var pages = [$scope.pageInfo.number + 1];
                            // left pager
                            for (var x = $scope.pageInfo.number - 1; x >= $scope.pageInfo.number - 5 && x >= 0; x--) {
                                    pages.push(x + 1);
                            }
                            // right pager
                            for (var x = $scope.pageInfo.number + 1; x <= $scope.pageInfo.number + 5 && x < $scope.pageInfo.totalPages; x++) {
                                    pages.push(x + 1);
                            }
                            pages.sort(function (a, b) { return a - b });
                            $scope.pager = {
                                    active: $scope.pageInfo.number + 1,
                                    pages: pages
                            };
                    }, true);
                }

	}]);

})(angular);
