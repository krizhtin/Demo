mainSystemModule.controller('GridRewardsConfigurationController', ['$scope', '$state', '$modal', 'StoredProcedureService', 'ParamsEligibilityFldsService',
                                                                   'ParamsEligibilityTablesService', 'ParamsCndtnFldsService', 'ParamsCndtnTablesService',
                                                                   'ParamNotificationService', 'ReferenceTableService', 
                                                                   function(s, st, m, sp, pef, pet, pcf, pct, pn, rt) { // USER GRID

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

	s.filterColumn = "label"; // DEFAULT Filter Column Dropdown
	s.$watch('filterColumn', function(newValue, oldValue){ // On Filter Column Change
		console.log(newValue, oldValue);
	});

	s.filter = { // Default Sorting Values
		sortColumn: "label",
		sortType: "asc"
	}

	s.perPageList = [ // Default Table Paging Options
		{text:"10 Per Page", value:10},
		{text:"20 Per Page", value:20},
		{text:"30 Per Page", value:30}
	];

	s.spcolumns = [
        {'label' : "Label",'field' : "label"},
        {'label' : "Query",'field' : "query"},
        {'label' : "remarks",'field' : "remarks"}
	];

	s.recolumns = [
        {'label' : "Table Name",'field' : "tableName"},
        {'label' : "Field Name",'field' : "fieldName"}
	];

	s.pccolumns = [
        {'label' : "Table Name",'field' : "tableName"},
        {'label' : "Field Name",'field' : "fieldName"}
	];

	s.nmcolumns = [
        {'label' : "Message Code",'field' : "messageCode"},
        {'label' : "Message",'field' : "message"}
	];

	function refreshGrid() { // Refresh Table Data
		spRefreshGrid();
		reRefreshGrid();
		pcRefreshGrid();
		nmRefreshGrid();
	}
	
	function spRefreshGrid(){
		s.result = sp.getAll(function(result){
			console.log("Displayed SP: ", result._embedded.storedProcedures);
			s.spdata = result._embedded.storedProcedures;
			s.pageInfo = result.page;
		});
	}
	
	function reRefreshGrid(){
		s.result = pef.getAll(function(result){
			console.log("Displayed RE: ", result._embedded.paramsEligibilityFlds);
			s.redata = result._embedded.paramsEligibilityFlds;
			s.pageInfo = result.page;
		});
	}
	
	function pcRefreshGrid(){
		s.result = pcf.getAll(function(result){
			console.log("Displayed PC: ", result._embedded.paramsCndtnFlds);
			s.pcdata = result._embedded.paramsCndtnFlds;
			s.pageInfo = result.page;
		});
	}
	
	function nmRefreshGrid(){
		s.result = pn.getAll(function(result){
			console.log("Displayed NM: ", result._embedded.paramNotifications);
			s.nmdata = result._embedded.paramNotifications;
			s.pageInfo = result.page;
		});
	}

	s.spbdoTable = {
		row: { // Table Row Buttons
			view: function (index, row) {
				// st.go('Stored Procedure View', {stored_procedure_id: row.id});
			},
			edit: function (index, row) {

				m.open( {
					templateUrl: 'js/nrs/view/systemconfiguration/rewardsconfiguration/modal/SPform.html',
					controller: ['$scope', '$modalInstance', function(s, mi) {
						
						s.sp = row;
						s.sp.label = row.label;
						s.sp.query = row.query;
						s.sp.remarks = row.remarks;

						console.log(row);
						
						s.add = function(){
							//add
							// console.log("s.sp: ", s.sp);
							sp.update(s.sp, function(){
								spRefreshGrid();
								mi.dismiss("cancel");
								nz_init_successMessage("Successfully saved.");
							});
						}
						
						s.cancel = function(){
							mi.dismiss('Cancel');
						}
					}],
					size: "md",
					backdrop: false
				});

			},
			delete: function (index, row) {
				nz_init_confirmMessage("Are you sure you want to Delete?", function(){
					sp.delete(row, function(result){
						nz_init_successMessage("Successfully deleted.");
						spRefreshGrid();					
					});
				});
			}
		},
		pagination: { // Table Paginations
			next: function () {
				if(s.pageInfo.number < s.pageInfo.totalPages-1) {
					s.pageInfo.number++;
					spRefreshGrid()
				}
			},
			previous: function () {
				if(s.pageInfo.number !=  0) {
					s.pageInfo.number--;
					spRefreshGrid()
				}
			},
			page: function (page) {
				s.pageInfo.number = page-1;
				spRefreshGrid();
			},
			perPage: function (perPage) {
				s.pageInfo.size = perPage;
				spRefreshGrid();
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
			spRefreshGrid();
		}
	};

	s.rebdoTable = {
		row: { // Table Row Buttons
			view: function (index, row) {
				st.go('Stored Procedure View', {stored_procedure_id: row.id});
			},
			edit: function (index, row) {
				st.go('Stored Procedure Edit', {stored_procedure_id: row.id});
			},
			delete: function (index, row) {
				console.log(index, row);
				nz_init_confirmMessage("Are you sure you want to Delete?", function(){
					pef.delete(row, function(result){
						nz_init_successMessage("Successfully deleted.");
						reRefreshGrid();					
					});
				});
			}
		},
		pagination: { // Table Paginations
			next: function () {
				if(s.pageInfo.number < s.pageInfo.totalPages-1) {
					s.pageInfo.number++;
					reRefreshGrid()
				}
			},
			previous: function () {
				if(s.pageInfo.number !=  0) {
					s.pageInfo.number--;
					reRefreshGrid()
				}
			},
			page: function (page) {
				s.pageInfo.number = page-1;
				reRefreshGrid();
			},
			perPage: function (perPage) {
				s.pageInfo.size = perPage;
				reRefreshGrid();
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
			reRefreshGrid();
		}
	};

	s.pcbdoTable = {
		row: { // Table Row Buttons
			view: function (index, row) {
				st.go('Stored Procedure View', {stored_procedure_id: row.id});
			},
			edit: function (index, row) {
				st.go('Stored Procedure Edit', {stored_procedure_id: row.id});
			},
			delete: function (index, row) {
				nz_init_confirmMessage("Are you sure you want to Delete?", function(){
					pcf.delete(row, function(result){
						nz_init_successMessage("Successfully deleted.");
						pcRefreshGrid();					
					});
				});
			}
		},
		pagination: { // Table Paginations
			next: function () {
				if(s.pageInfo.number < s.pageInfo.totalPages-1) {
					s.pageInfo.number++;
					pcRefreshGrid()
				}
			},
			previous: function () {
				if(s.pageInfo.number !=  0) {
					s.pageInfo.number--;
					pcRefreshGrid()
				}
			},
			page: function (page) {
				s.pageInfo.number = page-1;
				pcRefreshGrid();
			},
			perPage: function (perPage) {
				s.pageInfo.size = perPage;
				pcRefreshGrid();
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
			pcRefreshGrid();
		}
	};

	s.nmbdoTable = {
		row: { // Table Row Buttons
			view: function (index, row) {
				st.go('Stored Procedure View', {stored_procedure_id: row.id});
			},
			edit: function (index, row) {
				st.go('Stored Procedure Edit', {stored_procedure_id: row.id});
			},
			delete: function (index, row) {
				nz_init_confirmMessage("Are you sure you want to Delete?", function(){
					pn.delete(row, function(result){
						nz_init_successMessage("Successfully deleted.");
						nmRefreshGrid();					
					});
				});
			}
		},
		pagination: { // Table Paginations
			next: function () {
				if(s.pageInfo.number < s.pageInfo.totalPages-1) {
					s.pageInfo.number++;
					nmRefreshGrid()
				}
			},
			previous: function () {
				if(s.pageInfo.number !=  0) {
					s.pageInfo.number--;
					nmRefreshGrid()
				}
			},
			page: function (page) {
				s.pageInfo.number = page-1;
				nmRefreshGrid();
			},
			perPage: function (perPage) {
				s.pageInfo.size = perPage;
				nmRefreshGrid();
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
			nmRefreshGrid();
		}
	};

	refreshGrid();
	
	s.spAdd = function(){

		m.open( {
			templateUrl: 'js/nrs/view/systemconfiguration/rewardsconfiguration/modal/SPform.html',
			controller: ['$scope', '$modalInstance', function(s, mi) {
				
				s.sp = {};
				s.sp.label = "";
				s.sp.query = "";
				s.sp.remarks = "";
				
				s.add = function(){
					//add
					// console.log("s.sp: ", s.sp);
					sp.save(s.sp, function(){
						spRefreshGrid();
						mi.dismiss("cancel");
						nz_init_successMessage("Successfully saved.");
					});
				}
				
				s.cancel = function(){
					mi.dismiss('Cancel');
				}
			}],
			size: "md",
			backdrop: false
		});
	}
	
	s.reAdd = function(){

		m.open( {
			templateUrl: 'js/nrs/view/systemconfiguration/rewardsconfiguration/modal/REform.html',
			controller: ['$scope', '$modalInstance', function(s, mi) {
				
				s.re = {};
				s.re.tablename = "";
				s.result = rt.getAllDropdown(function(result){
					s.tableNames = result._embedded.appTables;
					s.pageInfo = result.page;
				});

				s.$watch("re.tablename", function(){
					try{
						s.re.fieldname = 0;
						s.appTableFields = s.tableNames[s.re.tablename].appTableFields;
					}catch(err){
						s.appTableFields = [];
					};
				});
				
				s.add = function(){
					//add
					s.tableSave = {};
					s.fieldSave = {};

					s.tableSave.tableName = s.tableNames[s.re.tablename].tableName;
					s.tableSave.show = $("#usevalues").prop("checked");
					s.tableSave.modelName = s.tableNames[s.re.tablename].modelName;

					s.fieldSave.fieldName = s.appTableFields[s.re.fieldname].fieldName;
					s.fieldSave.show = $("#usevalues").prop("checked");
					s.fieldSave.useValue = $("#usevalues").prop("checked");
					s.fieldSave.paramsEligibilityTable = s.re.tablename;

					pet.save(s.tableSave, function(){
						spRefreshGrid();
						mi.dismiss("cancel");
						nz_init_successMessage("Successfully saved.");
					});
					pef.save(s.fieldSave, function(){
						spRefreshGrid();
						mi.dismiss("cancel");
						nz_init_successMessage("Successfully saved.");
					});
				}

				s.cancel = function(){
					mi.dismiss('Cancel');
				}
			}],
			size: "md",
			backdrop: false
		});
	}
	
	s.pcAdd = function(){

		m.open( {
			templateUrl: 'js/nrs/view/systemconfiguration/rewardsconfiguration/modal/PCform.html',
			controller: ['$scope', '$modalInstance', function(s, mi) {
				
				s.pc = {};
				s.pc.tablename = "";	
				s.result = rt.getAllDropdown(function(result){
					s.tableNames = result._embedded.appTables;
					console.log(s.tableNames);
					s.pageInfo = result.page;
				});

				s.$watch("pc.tablename", function(){
					try{
						s.pc.fieldname = 0;
						s.appTableFields = s.tableNames[s.pc.tablename].appTableFields;
					}catch(err){
						s.appTableFields = [];
					};
				});
				
				s.add = function(){
					//add
					s.tableSave = {};
					s.fieldSave = {};

					s.tableSave.tableName = s.tableNames[s.pc.tablename].tableName;
					s.tableSave.show = $("#usevalues").prop("checked");
					s.tableSave.modelName = s.tableNames[s.pc.tablename].modelName;

					s.fieldSave.fieldName = s.appTableFields[s.pc.fieldname].fieldName;
					s.fieldSave.show = $("#usevalues").prop("checked");
					s.fieldSave.useValue = $("#usevalues").prop("checked");
					s.fieldSave.paramsEligibilityTable = s.pc.tablename;

					pct.save(s.tableSave, function(){
						spRefreshGrid();
						mi.dismiss("cancel");
						nz_init_successMessage("Successfully saved.");
					});
					pcf.save(s.fieldSave, function(){
						spRefreshGrid();
						mi.dismiss("cancel");
						nz_init_successMessage("Successfully saved.");
					});
				}

				s.cancel = function(){
					mi.dismiss('Cancel');
				}
			}],
			size: "md",
			backdrop: false
		});
	}
	
	s.nmAdd = function(){

		m.open( {
			templateUrl: 'js/nrs/view/systemconfiguration/rewardsconfiguration/modal/NMform.html',
			controller: ['$scope', '$modalInstance', function(s, mi) {
				
				s.nm = {};
				s.nm.messageCode = "";
				s.nm.message = "";
				
				s.add = function(){
					//add
					console.log(s.nm);

					pn.save(s.nm, function(){
						nmRefreshGrid();
						mi.dismiss("cancel");
						nz_init_successMessage("Successfully saved.");
					});
				}

				s.cancel = function(){
					mi.dismiss('Cancel');
				}
			}],
			size: "md",
			backdrop: false
		});
	}
	
}]);