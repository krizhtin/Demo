angular.module("mainSystemModule").controller('GridPushNotificationController', ['$scope', '$state', '$stateParams', 'ReferenceTableService', '$modal', function(s, rt, sp, r, m) { // Form Initializer

	s.pageInfo = { // Default Page Info
		last: false,
		totalPages: 1,
		totalElements: 1,
		size: 10,
		number: 0,
		numberOfElements: 10,
		first: true
	};

	s.filter = { // Default Sorting Values
		sortColumn: "tabName",
		sortType: "asc"
	}

	s.perPageList = [ // Default Table Paging Options
		{text:"10 Per Page", value:10},
		{text:"20 Per Page", value:20},
		{text:"30 Per Page", value:30}
	];

	s.columns = [ // Default Columns ( 'Label' is display name, 'field' is datafield name, 'sortable' enables sorting for the column)
		{'label':"Event", 'field':"event", 'sortable':true},
		{'label':"Message Code", 'field':"code", 'sortable':true},
		{'label':"Type", 'field':"type", 'sortable':true}
	];

	s.data = [
		{"event":"1l", "code":"1c", "type":"1f"},	
		{"event":"2l", "code":"2c", "type":"2f"},
		{"event":"3l", "code":"3c", "type":"3f"}
	];

	function refreshGrid() { // Refresh Table Data
		s.data = s.data;
	}

	function cancel(index, row) {
		s.data[index] = row;
	}

	function create(row) {
		s.data.push(row);
	}

	s.bdoTable = {
		row: { // Table Row Buttons
			edit: function (index, row) {
				var base = JSON.parse(JSON.stringify(row));

				m.open( {
					templateUrl: 'js/nrs/view/rewardsprogram/computations/pushnotifications/form.html',
					controller: ['$scope', '$modalInstance', function(s, mi) {

						s.row = row;

						s.save = function(){
							mi.dismiss('Cancel');
						}
				
						s.cancel = function(){
							cancel(index, base);
							mi.dismiss('Cancel');
						}

					}],
					size: "md",
					backdrop: false
				});

			},
			delete: function (index, row) {
				s.data.splice(index, 1);
			}
		},
		pagination: { // Table Paginations
			next: function () {
				if(s.pageInfo.number < s.pageInfo.totalPages-1) {
					s.pageInfo.number++;
					refreshGrid()
				}
			},
			previous: function () {
				if(s.pageInfo.number !=  0) {
					s.pageInfo.number--;
					refreshGrid()
				}
			},
			page: function (page) {
				s.pageInfo.number = page-1;
				refreshGrid();
			},
			perPage: function (perPage) {
				s.pageInfo.size = perPage;
				refreshGrid();
			}
		},
		sort: function (field) { // Table Sorting
			if(s.filter.sortColumn != field) {
				s.filter = {
					sortColumn: field,
					sortType: "asc"
				}
			}
			else {
				s.filter.sortType = s.filter.sortType == "asc" ? "desc" : "asc";
			}
			refreshGrid();
		}
	};

	refreshGrid();

	s.$on('pushNotifications', function () {

		m.open( {
			templateUrl: 'js/nrs/view/rewardsprogram/computations/pushnotifications/form.html',
			controller: ['$scope', '$modalInstance', function(s, mi) {

				s.row = {};

				s.save = function(){
					create(s.row);
					mi.dismiss('Cancel');
				}
		
				s.cancel = function(){
					mi.dismiss('Cancel');
				}

			}],
			size: "md",
			backdrop: false
		});
	});

}]);
