mainSystemModule.controller('GroupProfilesGridController', ['$scope', 'UserService', '$state', 'GroupService', '$rootScope', function(s, u, st, g, rs) { // USER GRID

	s.searchColumn = "groupCode"; // DEFAULT Search Value
	s.$watch('searchColumn', function(value){ // On Search Column Change
		refreshGrid();
	});
	s.searchValue = ""; // DEFAULT Search Column Dropdown
	s.$watch('searchValue', function(value){ // On Search Value Change
		refreshGrid();
	});
	s.sortColumn = "groupCode";
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
		{'label':"Group Code", 'field':"groupCode"},
		{'label':"Group Name", 'field':"groupName"},
		{'label':"Description", 'field':"description"},
	];

	function refreshGrid() { // Refresh Table Data
		var filters = {
			"page":s.pageInfo.number,
			"size":s.pageInfo.size,
			"sort":s.sortColumn + "," + s.sortType,
			"searchColumn": s.searchColumn,
			"searchValue": s.searchValue
		};

		g.getAllWithPageAndFilters(filters, function(result){
			console.log("result : ", result);
			s.data = result._embedded.groups;
			s.pageInfo = result.page;
		}, function(result){
			console.log("Error in ajax!");
		});
	}

	s.groupProfileTable = {
		row: { // Table Row Buttons
			view: function (index, row) {},
			edit: function (index, row) {
				st.go('Edit Group Profiles', {id: row.id});
			},
			delete: function (index, row) {
				nz_init_confirmMessage("Are you sure you want to delete record?", function() {
					g.delete(row, function(){
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

	s.createGroup_button = function() {
		rs.stateFrom = "Group Profiles";
		st.go('Create Group Profiles');
	}
}]);