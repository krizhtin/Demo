mainSystemModule.controller('AccessLevelsGridController', ['$scope', 'AccessLevelService', '$state', function(s, a, st) { // USER GRID
	
	s.searchColumn = "accessLevelName"; // DEFAULT Search Value
	s.$watch('searchColumn', function(value){ // On Search Column Change
		refreshGrid();
	});
	s.searchValue = ""; // DEFAULT Search Column Dropdown
	s.$watch('searchValue', function(value){ // On Search Value Change
		refreshGrid();
	});
	s.sortColumn = "accessLevelName";
	s.sortType = "asc";
	s.pageInfo = { // Default Page Info
		last: false,
		totalPages: 1,
		totalElements: 1,
		size: 10,
		number: 0,
		numberOfElements: 10,
		first: true
	};
	s.perPageList = [ // Default Table Paging Options
		{text:"10 Per Page", value:10},
		{text:"20 Per Page", value:20},
		{text:"30 Per Page", value:30}
	];
	s.columns = [ // Default Columns
		{'label':"Access Level Name", 'field':"accessLevelName"},
		{'label':"Parent Access Level", 'field':"parentAccessLevelName", 'sortable':false},
		{'label':"Created By", 'field':"createdByName", 'sortable':false},
		{'label':"Created Date", 'field':"createdDate", "datatype":"date"},
		{'label':"Modified By", 'field':"modifiedByName", 'sortable':false},
		{'label':"Modified Date", 'field':"modifiedDate", "datatype":"date"}
	];

	function refreshGrid() { // Refresh Table Data
		var filters = {
			"page":s.pageInfo.number,
			"size":s.pageInfo.size,
			"sort":s.sortColumn + "," + s.sortType,
			"searchColumn": s.searchColumn,
			"searchValue": s.searchValue
		};

		var result = a.getAllWithPageAndFilters(filters, function(result){
		    s.data = result._embedded.accessLevels;
			s.pageInfo = result.page;
		}, function(result){
			console.log("Error in ajax!");
		});
	}

	s.bdoTable = {
		row: { // Table Row Buttons
			view: function (index, row) {},
			edit: function (index, row) {
				st.go('Edit Access Levels', {id: row.id});
			},
			delete: function (index, row) {
				nz_init_confirmMessage("Are you sure you want to delete record?", function() {
					a.delete(row, function(){
						nz_init_successMessage("Successfully deleted.");
						refreshGrid();
					}, function(result){
						console.log(result);
						nz_init_errorMessage(result.data.message);
					});
				});
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
			if(s.sortColumn != field) {
				s.sortColumn = field;
				s.sortType = "asc";
			}
			else {
				s.sortType = s.sortType == "asc" ? "desc" : "asc";
			}
			refreshGrid();
		}
	};
}]);