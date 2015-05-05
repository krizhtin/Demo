mainSystemModule.controller('GridCouponsController', ['$scope','$state','CouponsService', function(s, st, c) { // FORM

	s.save = function(){
		nz_init_confirmMessage("Are you sure you want to save changes?", function(){
			$('#regen_modal').modal('hide');				
		});
	}

	s.cancel = function(){
		nz_init_confirmMessage("Are you sure you want to cancel changes?", function(){
			$('#regen_modal').modal('hide');				
		});
	}

	/*----------COUPONS-----GRID FUNCTION----------*/
	s.searchColumn = "couponNumber";
	s.searchValue = "";
	s.$watch('searchValue', function(value){ // On Search Value Change
		refreshGrid();
	});
	s.sortColumn = "couponNumber";
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
		{'label':"Coupon Number", 'field':"couponNumber", 'sortable':false},
		{'label':"Item Code", 'field':"itemCode", 'sortable':false},
		{'label':"Account Number", 'field':"account", 'sortable':false},
		{'label':"Name", 'field':"accName1", 'sortable':false},
		{'label':"Bank", 'field':"bankName", 'sortable':false},
		{'label':"Data Issued", 'field':"dateIssued", 'sortable':false},
		{'label':"Issue Number", 'field':"issueNum", 'sortable':false},
		{'label':"Status", 'field':"status", 'sortable':false},
		{'label':"Remarks", 'field':"remarks", 'sortable':false}
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

	s.CouponsGrid = {
		row: { // Table Row Buttons
			view: function (index, row) {
				
			},
			edit: function (index, row) {
				if(row.status.toUpperCase() == "VOID"){
					nz_init_errorMessage("Cannot regenerate which is already Void");
				}else{
					$('#regen_modal').modal();
					s.save = function(){
						nz_init_confirmMessage("Are you sure you want to save changes?", function(){
							s.newItem = {};
							s.newItem.couponNumber = row.couponNumber;
							s.newItem.rewardItem = row.rewardItem._links.self.href;
							s.newItem.bdoAccount = row.bdoAccount._links.self.href;
							s.newItem.bank = row.bank._links.self.href;
							s.newItem.bdoCard = row.bdoCard._links.self.href;
							s.newItem.dateIssued = row.dateIssued;
							s.newItem.issueNum = row.issueNum + 1;	
							s.newItem.status = "New";	

							s.currentItem = row;
							s.currentItem.remarks = $("#reason").val();
							s.currentItem.status = "Void";
							s.currentItem.rewardItem = row.rewardItem._links.self.href;
							s.currentItem.bdoAccount = row.bdoAccount._links.self.href;
							s.currentItem.bank = row.bank._links.self.href;
							s.currentItem.bdoCard = row.bdoCard._links.self.href;
							
							c.save(s.currentItem, function(result){
								$('#regen_modal').modal('hide');
								c.save(s.newItem, function(result){
									nz_init_successMessage("Successfully saved!", function() {
										refreshGrid();
									});								
								},function(error){
									alert("error");
								});								
							},function(error){
								alert("error");
							});	
						});
					}
				}
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