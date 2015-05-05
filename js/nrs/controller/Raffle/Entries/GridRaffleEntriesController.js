mainSystemModule.controller('GridRaffleEntriesController', ['$scope', 'UserService', '$state', 'GroupService', '$rootScope', '$modal', function(s, u, st, als, rs, m) { // USER GRID

	// var a = [1,2,3];
	// a = a.reverse();
	// a.pop();
	// console.log(a);

	s.pageInfo = { // Default Page Info
		last: false,
		totalPages: 1,
		totalElements: 1,
		size: 10,
		number: 0,
		numberOfElements: 10,
		first: true
	};

	s.filterValue = ""; // DEFAULT Filter Value
	s.$watch('filterValue', function(newValue, oldValue){ // On Filter Value Change
		console.log(newValue, oldValue);
	});

	s.filterColumn = "raffle_nbr"; // DEFAULT Filter Column Dropdown
	s.$watch('filterColumn', function(newValue, oldValue){ // On Filter Column Change
		console.log(newValue, oldValue);
	});

	s.search = { // Default Sorting Values
		'raffle_nbr': "",
	}

	s.filter = { // Default Sorting Values
		sortColumn: "raffle_nbr",
		sortType: "asc"
	}

	s.perPageList = [ // Default Table Paging Options
		{text:"10 Per Page", value:10},
		{text:"20 Per Page", value:20},
		{text:"30 Per Page", value:30}
	];

	s.columns = [
		{ 'label': 'Raffle Entry Number', 'field': 'raffle_nbr'},
		{ 'label': 'Program Code', 'field': 'program_id'},
		{ 'label': 'Account Number', 'field': 'account'},
		{ 'label': 'Name', 'field': 'acc_name1'},
		{ 'label': 'Bank', 'field': 'bank'},
		{ 'label': 'Created Date', 'field': 'created_date'}
	];

	function refreshGrid() { // Refresh Table Data
		// s.usersResult = u.getAllWithFilter(s.pageInfo.number, s.pageInfo.size, s.filter.sortColumn, s.filter.sortType, s.search, function(result){
		// 	console.log("result : ", result);
		// 	s.data = result._embedded.users;
		// 	s.pageInfo = result.page;
		// });
		s.data = [{raffle_nbr:"Paullie"}];
	}

	s.bdoTable = {
		row: { // Table Row Buttons
			view: function (index, row) {
				st.go('View User Accounts', {user_id: row.id});
			},
			edit: function (index, row) {
				st.go('Edit User Accounts', {user_id: row.id});
			},
			delete: function (index, row) {
				// nz_init_confirmMessage("Are you sure you want to Delete?", function(){
				// 	u.delete(row, function(result){
				// 		nz_init_successMessage("Successfully deleted.");
				// 		refreshGrid();					
				// 	});
				// });
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
}]);