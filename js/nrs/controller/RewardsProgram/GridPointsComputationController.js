angular.module("mainSystemModule").controller('GridPointsComputationController', ['$scope', '$state', '$stateParams', 'ReferenceTableService', '$modal', function(s, rt, sp, r, m) { // Form Initializer

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
		{'label':"Label", 'field':"label", 'sortable':true},
		{'label':"Condition Program", 'field':"condition", 'sortable':true},
		{'label':"Formula", 'field':"formula", 'sortable':true},
		{'label':"Remarks", 'field':"remarks", 'sortable':true}
	];

	s.data = [
		{"label":"1l", "condition":"1c", "formula":"1f", "remarks":"1r"},	
		{"label":"2l", "condition":"2c", "formula":"2f", "remarks":"2r"},
		{"label":"3l", "condition":"3c", "formula":"3f", "remarks":"3r"}
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
					templateUrl: 'js/nrs/view/rewardsprogram/computations/pointscomputation/form.html',
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
				// console.log('ROW', row);
				// nz_init_confirmMessage("Are you sure you want to delete record?", function(){
				// s.data.splice(index, 1);
				// 	nz_init_successMessage("Record successfully deleted.");
				// 	// refreshGrid();
				// });
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

	s.$on('pointsComputation', function () {

		m.open( {
			templateUrl: 'js/nrs/view/rewardsprogram/computations/pointscomputation/form.html',
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
