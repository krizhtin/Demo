mainSystemModule.controller('GridRedemptionListController', ['$scope','$state','RedemptionRequestService', function(s, st, rr) { //GRID

	s.pageInfo = { // Default Page Info
		last: false,
		totalPages: 1,
		totalElements: 1,
		size: 10,
		number: 0,
		numberOfElements: 10,
		first: true
	};

	s.searchColumn = "id";
	s.searchValue = "";
	s.$watch('searchValue', function(value){ // On Search Value Change
		refreshGrid();
	});
	s.sortColumn = "id";
	s.sortType = "asc";

	s.filterValue = ""; // DEFAULT Filter Value

	s.perPageList = [ // Default Table Paging Options
		{text:"10 Per Page", value:10},
		{text:"20 Per Page", value:20},
		{text:"30 Per Page", value:30}
	];

	s.columns = [ // Default Columns ( 'Label' is display name, 'field' is datafield name, 'sortable' enables sorting for the column)
		{'label':"Redemption Code", 'field':"id"},
		{'label':"Card Number", 'field':"cardNbr"},
		{'label':"Account Name", 'field':"accName1"},
		{'label':"Item Code", 'field':"itemCode"},
		{'label':"Item Description", 'field':"itemDesc"},
		{'label':"Quantity", 'field':"quantity"},
		{'label':"Status", 'field':"status"}
	];

	function refreshGrid() { // Refresh Table Data
		var filters = {
				"page":s.pageInfo.number,
				"size":s.pageInfo.size,
				"sort":s.sortColumn + "," + s.sortType,
				"searchColumn": s.searchColumn,
				"searchValue": s.searchValue
		};

		if(s.searchColumn == "id"){
			s.Result = rr.getAll(function(result){
				s.data = result._embedded.redemptionRequests;
				console.log("Result : ", result._embedded.redemptionRequests);
				s.pageInfo = result.page;
			});
		}else{
			s.Result = rr.getAllWithPageAndFilters(s.searchColumn ,filters, function(result){
			console.log("Result : ", result._embedded.redemptionRequests);
			s.data = result._embedded.redemptionRequests;
			s.pageInfo = result.page;
			}, function(result){
				alert("Error in ajax!");
			});		
		}		
	}

	s.RedemptionListGrid = {
		row: { // Table Row Buttons
			view: function (index, row) {
				st.go('View Redemption Request', {redemption_request_id: row.id});
			},
			edit: function (index, row) {				
			},
			delete: function (index, row) {
				nz_init_confirmMessage("Are you sure you want to Delete?", function(){
									
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