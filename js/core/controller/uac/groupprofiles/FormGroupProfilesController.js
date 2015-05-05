mainSystemModule.controller('FormGroupProfilesController', ['$scope', 'MenuService', '$state', '$stateParams', '$rootScope', function(s, m, st, sp, rs) { // USER GRID
	if(sp.id) {
		s.formTitle = "Edit Group Profile";
		refreshGrid();
	}
	else {
		s.formTitle = "Add Group Profile";
	}

	var savedMenus = [];
	s.data = [];

	$("#group_groupCode").nz_jqxTooltip("Required value</br>Unique value</br>Minimum of 3 characters</br>Maximum of 10 characters" ,"hover");
	$("#group_groupName").nz_jqxTooltip("Required value</br>Minimum of 1 character</br>Maximum of 25 characters" ,"hover");
	$("#group_groupDesc").nz_jqxTooltip("Optional value</br>Maximum of 100 characters" ,"hover");

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

	var groupAccessList = [
		{"text":"Accessible", "value":"Accessible"},
		{"text":"Not Accessible", "value":"Not Accessible"},
		{"text":"Accessible with Override", "value":"Accessible with Override"}
	];

	var groupOverrideList = [
		{"text":"Admin", "value":"Admin"},
		{"text":"Hacker", "value":"Hacker"},
		{"text":"Member", "value":"Member"}
	];

	s.columns = [ // Default Columns ( 'Label' is display name, 'field' is datafield name, 'sortable' enables sorting for the column)
		{'label':"Module Name", 'field':"menuName"},
		{'label':"View", 'field':"canView", "field_type":"dropdown", "dropdowncallback":function(row){
			if(row.hasView) {
				return groupAccessList;
			}
			else {
				return [];
			}
		}},
		{'label':"Create", 'field':"canView", "field_type":"dropdown", "dropdowncallback":function(row){ if(row.hasView) return groupAccessList; else return []; }},
		{'label':"Create", 'field':"canCreate", "field_type":"dropdown", "dropdowncallback":function(row){ if(row.hasCreate) return groupAccessList; else return []; }},
		{'label':"Edit", 'field':"canEdit", "field_type":"dropdown", "dropdowncallback":function(row){ if(row.hasEdit) return groupAccessList; else return []; }},
		{'label':"Delete", 'field':"canDelete", "field_type":"dropdown", "dropdowncallback":function(row){ if(row.hasDelete) return groupAccessList; else return []; }},
		{'label':"Import", 'field':"canImport", "field_type":"dropdown", "dropdowncallback":function(row){ if(row.hasImport) return groupAccessList; else return []; }},
		{'label':"Print", 'field':"canPrint", "field_type":"dropdown", "dropdowncallback":function(row){ if(row.hasPrint) return groupAccessList; else return []; }},
		{'label':"Override By", 'field':"OverrideBy", "field_type":"dropdown", "dropdowncallback":function(row){ return groupOverrideList; }},
	];

	function checkMenuChanges() {
		$.each(s.data, function(idx1, value1){
			if(value1.canView || value1.canCreate || value1.canEdit || value1.canDelete || value1.canImport || value1.canPrint || value1.OverrideBy) {
				var alreadyExist = false;
				$.each(savedMenus, function(idx2, value2){
					if(value1.id == value2.id) {
						alreadyExist = true;
						value2 = value1;
					}
				});
				if(!alreadyExist) {
					savedMenus.push(value1);
				}
			}
		});
	}

	function loadMenuChanges() {
		var newRecord = s.data;
		$.each(savedMenus, function(idx1, value1){
			$.each(newRecord, function(idx2, value2){
				if(value1.id == value2.id) {
					console.log(value1);
					if(value1.canView) value2.canView = value1.canView;
					if(value1.canCreate) value2.canCreate = value1.canCreate;
					if(value1.canEdit) value2.canEdit = value1.canEdit;
					if(value1.canDelete) value2.canDelete = value1.canDelete;
					if(value1.canImport) value2.canImport = value1.canImport;
					if(value1.canPrint) value2.canPrint = value1.canPrint;
					if(value1.OverrideBy) value2.OverrideBy = value1.OverrideBy;
				}
			});
		});
	}

	function refreshGrid() { // Refresh Table Data
		checkMenuChanges();

		var filters = {
			"page":s.pageInfo.number,
			"size":s.pageInfo.size
		};

		m.getAllWithPage(filters, function(result){
			console.log("result : ", result);
			
			s.data = loadMenuChanges(result._embedded.menus);
			s.pageInfo = result.page;
		}, function(result){
			console.log("Error in ajax!");
		});
	}

	s.bdoTable = {
		row: { // Table Row Buttons
			view: function (index, row) {},
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

	var validate = nz_validation(s, [
		{'model':'group.groupCode', 'id':'group_groupCode', 'minlength':3, 'maxlength':10, 'conditions':{
			'onKeypress':{
				'Regex': new RegExp("^[a-zA-Z0-9_]$", "i")
			}, 'onSubmit':{
				'Regex': new RegExp("^[a-zA-Z0-9_]+$"),
				'Required':true
			}, 'onBlur': {
					'Regex': new RegExp("^[a-zA-Z0-9_]+$"),
					'Required':true
				}
			}
		},

		{'model':'group.groupName', 'id':'group_groupName', 'minlength':1, 'maxlength':25, 'conditions':{
			'onKeypress':{
				'Regex': new RegExp("^[a-zA-Z0-9_ ]$", "i"),
			}, 'onSubmit':{
				'Regex': new RegExp("^[a-zA-Z0-9_ ]$", "i"),
				'Required':true
			}, 'onBlur': {
					'Regex': new RegExp("^[a-zA-Z0-9_ ]$", "i"),
					'Required':true
				}
			}
		},

		{'model':'group.groupDesc', 'id':'group_groupDesc', 'minlength':0, 'maxlength':100, 'conditions':{}
		}
	]);

	if(sp.id) s.save_button = function() {
		validate(function(){
			alert("Edit!");
		});
	}
	else s.save_button = function() {
		console.log(s.data);
		return;
		validate(function(){
			alert("Added!");
		});
	}

	s.cancel_button = function() {
		nz_init_confirmMessage("Are you sure you want to discard changes?", function() {
			if(rs.stateFrom || rs.stateFrom == "Group Profile Filters") st.go(rs.stateFrom);
			else st.go('Group Profiles');
		});
	}
}]);