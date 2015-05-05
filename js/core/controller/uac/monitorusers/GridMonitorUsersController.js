mainSystemModule.controller('GridMonitorUsersController', ['$scope', 'UserService', '$state', 'GroupService', '$rootScope', 'bdoUser', function(s, u, st, als, rs, bu) { // USER GRID

	s.regenerate = function (index, row) {
		console.log('index', index);
		console.log('row', row);
	};

	s.searchColumn = "username";
	s.searchValue = "";
	s.$watch('searchValue', function(value){ // On Search Value Change
		refreshGrid();
	});

	s.pageInfo = { // Default Page Info
		last: false,
		totalPages: 1,
		totalElements: 1,
		size: 10,
		number: 0,
		numberOfElements: 10,
		first: true
	};
	s.sortColumn = "username";
	s.sortType = "asc";

	s.perPageList = [ // Default Table Paging Options
		{text:"10 Per Page", value:10},
		{text:"20 Per Page", value:20},
		{text:"30 Per Page", value:30}
	];

	s.columns = [ // Default Columns ( 'Label' is display name, 'field' is datafield name, 'sortable' enables sorting for the column)
		{'label':"Username", 'field':"username"},
		{'label':"Name", 'field':"fullName"},
		{'label':"Group Profile", 'field':"groupsList", 'sortable':false},
		{'label':"Access Level", 'field':"accessLevelName", 'sortable':false},
		{'label':"Status", 'field':"status"},
		{'label':"Creation Date/Time", 'field':"createdDate", "datatype":"date"},
		{'label':"Expiry Date/Time", 'field':"expiryDate", "datatype":"date"},
		{'label':"System Activity", 'field':"systemActivity", "datatype":""},
		{'label':"Last Login Date/Time", 'field':"lastloginDate", "datatype":"date"}
	];

	function refreshGrid() { // Refresh Table Data
		var filters = {
			"page":s.pageInfo.number,
			"size":s.pageInfo.size,
			"sort":s.sortColumn + "," + s.sortType,
			"searchColumn": s.searchColumn,
			"searchValue": s.searchValue
		};

		s.usersResult = u.getAllWithPageAndFilters(filters, function(result){
			console.log("result", result);
			s.data = result._embedded.users;
			console.log("data", s.data);
			s.pageInfo = result.page;
		}, function(result){
			console.log("Error in ajax!");
		});
	}

	s.bdoTable = {
		row: { // Table Row Buttons
			view: function (index, row) {
				st.go('View User Accounts', {user_id: row.id});
			},
			edit: function (index, row) {
				st.go('Edit User Accounts', {id: row.id});
			},
			delete: function (index, row) {
				nz_init_confirmMessage("Are you sure you want to Delete?", function(){
					u.delete(row, function(result){
						nz_init_successMessage("Successfully deleted.");
						refreshGrid();					
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