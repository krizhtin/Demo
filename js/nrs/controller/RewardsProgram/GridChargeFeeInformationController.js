angular.module("mainSystemModule").controller('GridChargeFeeInformationController', ['$scope', '$state', '$stateParams', 'ReferenceTableService', '$modal', function(s, rt, sp, r, m) { // Form Initializer

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
		{'label':"Service Provider", 'field':"service", 'sortable':true},
		{'label':"TRDEF", 'field':"trdef", 'sortable':true},
		{'label':"Amount", 'field':"amount", 'sortable':true},
		{'label':"Fee Delay", 'field':"delay", 'sortable':true}
	];

	s.data = [
		{"service":"1l", "trdef":"1c", "amount":"1f", "delay":"1r"},	
		{"service":"2l", "trdef":"2c", "amount":"2f", "delay":"2r"},
		{"service":"3l", "trdef":"3c", "amount":"3f", "delay":"3r"}
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
					templateUrl: 'js/nrs/view/rewardsprogram/computations/chargefeeinformation/form.html',
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

	s.$on('chargeFeeInformation', function () {

		m.open( {
			templateUrl: 'js/nrs/view/rewardsprogram/computations/chargefeeinformation/form.html',
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
