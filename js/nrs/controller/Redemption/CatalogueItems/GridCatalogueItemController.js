mainSystemModule.controller('GridCatalogueItemController', ['$scope','$state','CatalogueService', function(s, st, c) { // FORM

	/*----------VOUCHERS-----GRID FUNCTION----------*/
	s.searchColumn = "itemCode";
	s.searchValue = "";
	s.$watch('searchValue', function(value){ // On Search Value Change
		refreshGrid();
	});
	s.sortColumn = "itemCode";
	s.sortType = "asc";

	s.filterValue = ""; // DEFAULT Filter Value
	
	s.perPageList = [ // Default Table Paging Options
		{text:"10 Per Page", value:10},
		{text:"20 Per Page", value:20},
		{text:"30 Per Page", value:30}
	];

	s.pageInfo = { // Default Page Info
		last: false,
		totalPages: 1,
		totalElements: 1,
		size: 10,
		number: 0,
		numberOfElements: 10,
		first: true
	};

	s.columns = [ // Default Columns ( 'Label' is display name, 'field' is datafield name, 'sortable' enables sorting for the column)		
		{'label':"Item Code", 'field':"itemCode", 'sortable':false},
		{'label':"Catalogue", 'field':"catalogueName", 'sortable':false},
		{'label':"Item Category", 'field':"category", 'sortable':false},
		{'label':"Description", 'field':"itemDesc", 'sortable':false},
		{'label':"Status", 'field':"statusName", 'sortable':false}
	];

	function refreshGrid() { // Refresh Table Data
		var filters = {
				"page":s.pageInfo.number,
				"size":s.pageInfo.size,
				"sort":s.sortColumn + "," + s.sortType,
				"searchColumn": s.searchColumn,
				"searchValue": s.searchValue
		};
		
		s.Result = c.getAllWithPageAndFilters(filters, function(result){
			console.log("Result : ", result._embedded.coupons);
			s.data = result._embedded.coupons;
			s.pageInfo = result.page;
		}, function(result){
			alert("Error in ajax!");
		});
	}

	s.CatalogueGrid = {
		row: { // Table Row Buttons
			view: function (index, row) {
				
			},
			edit: function (index, row) {
				st.go('Edit Catlogue Item',{item_id :row.id});
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
		}
	};
	refreshGrid();
}]);