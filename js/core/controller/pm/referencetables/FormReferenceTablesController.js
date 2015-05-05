angular.module("mainSystemModule").controller('FormReferenceTablesController', ['$scope', '$state', '$stateParams', 'ReferenceTableService', function(s, rt, sp, r) { // Form Initializer


	s.$watch("fileToUpload", function(value){
		console.log(value);
	})
	console.log("ID", sp.id);
	if(sp.id) {
		r.getById(sp.id, function(result){
			console.log("Edited appTable:", result);
			s.appTable = result;
			s.appTable.createdDate = dateWithTimeReformatter(new Date(s.appTable.createdDate));
			s.appTable.modifiedDate = dateWithTimeReformatter(new Date(s.appTable.modifiedDate));
			refreshGrid();
		})
	}
	else {

	}

	console.log("state", rt);
	s.appTable = {};
	s.fieldsPageInfo = { // Default Page Info
		last: false,
		totalPages: 1,
		totalElements: 1,
		size: 10,
		number: 0,
		numberOfElements: 10,
		first: true
	};
	s.valuesPageInfo = { // Default Page Info
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

	s.fieldsSortColumn = "fieldName";
	s.fieldsSortType = "asc";
	s.valuesSortColumn = "fieldName";
	s.valuesSortType = "asc";

	s.perPageList = [ // Default Table Paging Options
		{text:"10 Per Page", value:10},
		{text:"20 Per Page", value:20},
		{text:"30 Per Page", value:30}
	];

	s.fieldsColumns = [ // Default Columns ( 'Label' is display name, 'field' is datafield name, 'sortable' enables sorting for the column)
		{'label':"Field Name", 'field':"fieldName"},
		// {'label':"Key Column", 'field':"keycol", 'sortable':false},
		{'label':"Minimum Character", 'field':"minChar"},
		{'label':"Maximum Character", 'field':"maxChar", },
		// {'label':"Is Mandatory", 'field':"mandatory", 'sortable':false},
		{'label':"Field Type", 'field':"fieldType"}
	];

	s.valuesColumns = [];

	// function refreshGrid() { // Refresh Table Data
	// 	// var result = u.getAllWithFilter(s.pageInfo.number, s.pageInfo.size, s.filter.sortColumn, s.filter.sortType).get(function(result){
	// 	// 	u.hateoas(result); // GET ALL _links
	// 	// 	console.log(result);
	// 	// 	var accesslevel = result._embedded.appTables;
	// 	//     s.data = result._embedded.appTables;
	// 	// 	s.pageInfo = result.page;
	// 	// })
	// 	// s.fieldsData = [
	// 	// 	{tabName:"Card"}
	// 	// ];

	// 	s.valuesData = [
	// 		{"field1":"Card", "field2":"Card", "field3":"Card"},
	// 		{"field1":"Card", "field2":"Card", "field3":"Card"},
	// 		{"field1":"Card", "field2":"Card", "field3":"Card"}
	// 	];
	// }

	function refreshGrid() { // Refresh Table Data
		console.log("gwege")
		if(sp.id && s.appTable.modelName) {
			var filters = {
				"page":s.fieldsPageInfo.number,
				"size":s.fieldsPageInfo.size,
				"sort":s.fieldsSortColumn + "," + s.fieldsSortType,
			};

			r.getPageAppTableFieldsByAppTableId(sp.id, filters, function(result){
				console.log(sp.id+" : Fields", result);
				s.fieldsData = result._embedded.appTableFields;
				s.fieldsPageInfo = result.page;
				s.valuesColumns = [];
				$.each(result._embedded.appTableFields, function(idx, value){
					var modelColName = ""+value.colName;
					while(modelColName.indexOf("_") > -1) {
						var idx = modelColName.indexOf("_");
						var p1 = modelColName.substring(0, idx);
						var p2 = modelColName.substring(idx+1, modelColName.length);
						p2 = p2.charAt(0).toUpperCase() + p2.slice(1);
						modelColName = p1 + p2;
					}

					var newColumn = {"label":value.fieldName, "field":modelColName};
					if(modelColName.toLowerCase().indexOf("date") > -1) {
						newColumn["datatype"] = "date";
					}

					if(value.colName.toLowerCase().indexOf("_id") > -1 ||
						((value.colName.toLowerCase().indexOf("modified") > -1 || value.colName.toLowerCase().indexOf("create") > -1)
						&& ((value.colName.toLowerCase().indexOf("date") > -1) || value.colName.toLowerCase().indexOf("by") > -1))) {
					}
					else s.valuesColumns.push(newColumn);
				});
			});

			filters = {
				"page":s.valuesPageInfo.number,
				"size":s.valuesPageInfo.size,
				"sort":s.valuesSortType,
			};

			r.getPageAppTableValues(s.appTable.modelName, filters, function(result){
				console.log(sp.id+" : Values", result);
				s.valuesData = result._embedded[s.appTable.modelName];
				s.valuesPageInfo = result.page;
			});
		}
	}

	s.fieldsTable = {
		row: { // Table Row Buttons
			view: function (index, row) {},
			edit: function (index, row) {},
			delete: function (index, row) {}
		},
		pagination: { // Table Paginations
			next: function () {
				if(s.fieldsPageInfo.number < s.fieldsPageInfo.totalPages-1) {
					s.fieldsPageInfo.number++;
					refreshGrid()
				}
			},
			previous: function () {
				if(s.fieldsPageInfo.number !=  0) {
					s.fieldsPageInfo.number--;
					refreshGrid()
				}
			},
			page: function (page) {
				s.fieldsPageInfo.number = page-1;
				refreshGrid();
			},
			perPage: function (perPage) {
				s.fieldsPageInfo.size = perPage;
				refreshGrid();
			}
		},
		sort: function (field) { // Table Sorting
			if(s.fieldsSortColumn != field) {
				s.fieldsSortColumn = field;
				s.fieldsSortType = "asc";
			}
			else {
				s.fieldsSortType = s.fieldsSortType == "asc" ? "desc" : "asc";
			}
			refreshGrid();
		}
	};

	s.valuesTable = {
		row: { // Table Row Buttons
			view: function (index, row) {},
			edit: function (index, row) {},
			delete: function (index, row) {}
		},
		pagination: { // Table Paginations
			next: function () {
				if(s.valuesPageInfo.number < s.valuesPageInfo.totalPages-1) {
					s.valuesPageInfo.number++;
					refreshGrid()
				}
			},
			previous: function () {
				if(s.valuesPageInfo.number !=  0) {
					s.valuesPageInfo.number--;
					refreshGrid()
				}
			},
			page: function (page) {
				s.valuesPageInfo.number = page-1;
				refreshGrid();
			},
			perPage: function (perPage) {
				s.valuesPageInfo.size = perPage;
				refreshGrid();
			}
		},
		sort: function (field) { // Table Sorting
			if(s.fieldsSortColumn != field) {
				s.filter = {
					fieldsSortColumn: field,
					valuesSortType: "asc"
				}
			}
			else {
				s.valuesSortType = s.valuesSortType == "asc" ? "desc" : "asc";
			}
			refreshGrid();
		}
	};

	// $("#accessLevel_accessLevelName").nz_jqxTooltip("Required value</br>Minumum of 5 characters</br>Maximum of 30 characters", "hover");
	// $("#accessLevel_parentAccessLevel").nz_jqxTooltip("Optional value", "hover");

	var validate = nz_validation(s, [
		// {'model':'accessLevel.accessLevelName', 'id':'accessLevel_accessLevelName', 'minlength':5, 'maxlength':30, 'conditions':{
		// 	'onKeypress':{
		// 		'Regex': new RegExp("^[a-zA-Z0-9_]$", "i")
		// 	}, 'onSubmit':{
		// 		'Regex': new RegExp("^[a-zA-Z0-9_]+$"),
		// 			// 'Unique': {
		// 			// 	'Service': u.getByUsername;
		// 			// }
		// 		'Required':true
		// 	}, 'onBlur': {
		// 			'Regex': new RegExp("^[a-zA-Z0-9_]+$"),
		// 			// 'Unique': {
		// 			// 	'Service': u.getByUsername;
		// 			// }
		// 			'Required':true
		// 		}
		// 	}
		// },

		// {'model':'accessLevel.parentAccessLevel', 'id':'accessLevel_parentAccessLevel', 'conditions':{}}
	]);

	s.recoverChanges = function(option) {
		if(option) {
			s.appTable.tabName = s.tempTabName;
			s.appTable.fileUpload = s.tempFileUpload;
			s.appTable.status = s.tempStatus;
		}
		else {
			s.tempTabName = s.appTable.tabName;
			s.tempFileUpload = s.appTable.fileUpload;
			s.tempStatus = s.appTable.status;
		}
	}

	s.editMode = function(option) {
		s.editModeIsShow = option;
		if(option) {
			s.recoverChanges(false);
			$("#editTableInfo").hide();
			$("input#appTable_tabName").show();
			$("label#appTable_tabName").hide();
			$("select#appTable_fileUpload").show();
			$("label#appTable_fileUpload").hide();
			$("select#appTable_status").show();
			$("label#appTable_status").hide();
			$("#edit_buttons").show();
		}
		else {
			$("#editTableInfo").show();
			$("input#appTable_tabName").hide();
			$("label#appTable_tabName").show();
			$("select#appTable_fileUpload").hide();
			$("label#appTable_fileUpload").show();
			$("select#appTable_status").hide();
			$("label#appTable_status").show();
			$("#edit_buttons").hide();
		}
	};
	s.editMode(false);


	s.upload = function (files) {
        r.uploadFileAppTableValues(files, function(result){
        	console.log("Success Upload!");
        })
    };

	s.showAddImportButtons = function() { // SHOW AND HIDE BUTTONS
		$("#addImportButtons").show();
	}
	s.hideAddImportButtons = function() {
		$("#addImportButtons").hide();
	}

	s.addValues_button = function() { // ADD VALUES
		var fields = [];
		$.each(s.fieldsData, function(idx, value) {
			console.log("tang", value)
			if(value.colName.toLowerCase() == "status" || value.colName.toLowerCase().indexOf("_id") > -1 ||
				((value.colName.toLowerCase().indexOf("modified") > -1 || value.colName.toLowerCase().indexOf("create") > -1)
				&& ((value.colName.toLowerCase().indexOf("date") > -1) || value.colName.toLowerCase().indexOf("by") > -1))) {
			}
			else {
				var modelColName = ""+value.colName;
				while(modelColName.indexOf("_") > -1) {
					var idx = modelColName.indexOf("_");
					var p1 = modelColName.substring(0, idx);
					var p2 = modelColName.substring(idx+1, modelColName.length);
					p2 = p2.charAt(0).toUpperCase() + p2.slice(1);
					modelColName = p1 + p2;
				}
				fields.push({col_name:modelColName, field_type:value.fieldType, field_validation:value.fieldValidation, min_char:value.minChar, max_char:value.maxChar});
			}
		});

		nz_modalForm_new("Value", fields, function(result){
			result.status = "Active";
			console.log("Saving to " + s.appTable.modelName, "this : ",result)
			r.saveAppTableValue(s.appTable.modelName, result, function(result){
				nz_init_successMessage("Successfully Saved!");
			});
		});
	}

	s.importValues_button = function() { // IMPORT VALUES
		
	}

	s.save_button = function() { // SAVE FUNCTION ON EDIT MODE
		validate(function(){
			alert("EDITED!!!");
		});
	};	

	s.cancel_button = function() { // CANCEL FUNCTION EDIT MODE
		nz_init_confirmMessage("Are you sure you want to discard changes?", function() {
			//s.recoverChanges(true);
			s.editMode(false);
		});
	};

}]);
