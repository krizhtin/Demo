mainSystemModule.controller('GridReferenceTablesController', ['$scope', 'ReferenceTableService', '$state', function(s, rt, st) { // USER GRID
	
	s.pageInfo = { // Default Page Info
		last: false,
		totalPages: 1,
		totalElements: 1,
		size: 10,
		number: 0,
		numberOfElements: 10,
		first: true
	};

	s.sortColumn = "tableName";
	s.sortType = "asc";

	s.searchColumn = "tableName";
	s.searchValue = "";

	s.perPageList = [ // Default Table Paging Options
		{text:"10 Per Page", value:10},
		{text:"20 Per Page", value:20},
		{text:"30 Per Page", value:30}
	];

	s.columns = [ // Default Columns ( 'Label' is display name, 'field' is datafield name, 'sortable' enables sorting for the column)
		{'label':"Name", 'field':"tableName"},
		{'label':"Status", 'field':"status", 'sortable':false},
		{'label':"File Upload Options", 'field':"fileUpload", 'sortable':false},
		{'label':"Created Date/Time", 'field':"createdDate", 'sortable':false},
		{'label':"Created By", 'field':"modifiedByName", 'sortable':false},
		{'label':"Modified Date/Time", 'field':"modifiedDate", 'sortable':false},
		{'label':"Modified By", 'field':"modifiedByName", 'sortable':false}
	];

	function refreshGrid() { // Refresh Table Data
		var filters = {
			"page":s.pageInfo.number,
			"size":s.pageInfo.size,
			"sort":"asc",
			"searchColumn": s.searchColumn,
			"searchValue": s.searchValue
		};

		rt.getAllWithPageAndFilters(filters, function(result){
			var accesslevel = result._embedded.appTables;
		    s.data = result._embedded.appTables;
			s.pageInfo = result.page;
		})
	}

	s.referenceTable = {
		row: { // Table Row Buttons
			view: function (index, row) {
				st.go('Form Parameter Maintenance', {id: row.id});
			},
			edit: function (index, row) {},
			delete: function (index, row) {}
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