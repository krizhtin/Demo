mainSystemModule.controller('GridPointsManagementController', ['$scope','$state', function(s, st) { //GRID

	var a = [1,2,3];
	a = a.reverse();
	a.pop();
	console.log(a);

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

	s.filterColumn = "username"; // DEFAULT Filter Column Dropdown
	s.$watch('filterColumn', function(newValue, oldValue){ // On Filter Column Change
		console.log(newValue, oldValue);
	});

	s.search = { // Default Sorting Values
		'username': "",
	}

	s.filter = { // Default Sorting Values
		sortColumn: "username",
		sortType: "asc"
	}

	s.perPageList = [ // Default Table Paging Options
		{text:"10 Per Page", value:10},
		{text:"20 Per Page", value:20},
		{text:"30 Per Page", value:30}
	];

	s.columns = [ // Default Columns ( 'Label' is display name, 'field' is datafield name, 'sortable' enables sorting for the column)
		{'label':"Bank", 'field':"bank"},
		{'label':"Account Number", 'field':"account"},
		{'label':"Customer Number", 'field':"custr_nbr"},
		{'label':"Account Name", 'field':"acc_name1"},
		{'label':"Card Number", 'field':"card_nbr"},
		{'label':"Product", 'field':"product"},
		{'label':"Card Profile", 'field':"profil"},
	];

	function refreshGrid() { // Refresh Table Data
//		console.log("here!");
//		s.CardResult = c.getAll(function(result){
//			console.log("Result : ", result._embedded.bdoCards);
//			s.data = result._embedded.bdoCards;
//		});

		s.data = [
			{bank:"Paullie",
			acct_num:"Paullie",
			cust_num:"Paullie",
			acc_name:"Paullie",
			card_num:"Paullie",
			product:"Paullie",
			card_profil:"Paullie",}
		];
	}

	s.pointsManagementGrid = {
		row: { // Table Row Buttons
			view: function (index, row) {
				st.go('Select Account Number', {card_num: row.id});
			},
			edit: function (index, row) {				
			},
			delete: function (index, row) {				
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