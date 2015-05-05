mainSystemModule.controller('GridRewardsProgramController', ['$scope', 'RewardsProgramService', '$state', '$rootScope',
                                                             'PointsComputationService', 'BonusComputationService',
                                                             'RedemptionRequirementService', 'PointsCreditingService', 'PointsExpiryService',
                                                             'ChargeFeeInformationService', 'PushNotificationService',
                                                    function(s, rps, st, als, rs, 
                                                    		 ptsCmptnS, bnsCmptnS, 
                                                    		 rdmptnReqsS, ptsCrdtS, ptsExpS, 
                                                    		 chargeFeeInfoS, pushNotifS) { // Rewards progrom grid

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
		s.search = {};
		s.search["column"] = s.filterColumn;
		s.search["value"]= newValue;
		refreshGrid();
	});

	s.filterColumn = "programName"; // DEFAULT Filter Column Dropdown
	s.$watch('filterColumn', function(newValue, oldValue){ // On Filter Column Change
		s.search = {};
		s.search["column"] = newValue;
		s.search["value"]= s.filterValue;
		refreshGrid();
	});

	s.search = { // Default Sorting Values
		column: "programName",
		value: ""
	}

	s.filter = { // Default Sorting Values
		sortColumn: "programName",
		sortType: "desc"
	}

	s.perPageList = [ // Default Table Paging Options
		{text:"10 Per Page", value:10},
		{text:"20 Per Page", value:20},
		{text:"30 Per Page", value:30}
	];

	s.columns = [ // Default Columns ( 'Label' is display name, 'field' is datafield name, 'sortable' enables sorting for the column)
		{'label':"Bank Code", 'field':"bankCode", 'sortable':true},
		{'label':"Rewards Program", 'field':"programName", 'sortable':true},
		{'label':"Valid From", 'field':"validFrom", 'sortable':true},
		{'label':"Valid Until", 'field':"validUntil", 'sortable':true},
		{'label':"Status", 'field':"status", 'sortable':true}
	];

	function refreshGrid() { // Refresh Table Data
		s.result = rps.getAllWithFilter(s.search, s.pageInfo.number, s.pageInfo.size, s.filter.sortColumn, s.filter.sortType, function(result){
			s.data = result._embedded.rewardsPrograms;
			s.pageInfo = result.page;
		});
	}

	s.bdoTable = {
		row: { // Table Row Buttons
			view: function (index, row) {
				st.go('View Rewards Program', {id : row.id});
			},
			edit: function (index, row) {
				st.go('Edit Rewards Program', {id : row.id});
			},
			delete: function (index, row) {
				nz_init_confirmMessage("Are you sure you want to delete record?", function(){
					rps.delete(row, function(result){
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
}]);