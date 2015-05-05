mainSystemModule.controller('GridVouchersController', ['$scope','$state','VoucherService', function(s, st, v) { // FORM
	s.cancel = function(){
		nz_init_confirmMessage("Are you sure you want to cancel changes?", function(){
			$('#regen_modal').modal('hide');				
		});
	}

	/*----------VOUCHERS-----GRID FUNCTION----------*/
	s.searchColumn = "voucherNumber";
	s.searchValue = "";
	s.$watch('searchValue', function(value){ // On Search Value Change
		refreshGrid();
	});
	s.sortColumn = "voucherNumber";
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
		{'label':"Voucher Number", 'field':"voucherNumber", 'sortable':false},
		{'label':"Item Code", 'field':"itemCode", 'sortable':false},
		{'label':"Account Number", 'field':"account", 'sortable':false},
		{'label':"Name", 'field':"accName1", 'sortable':false},
		{'label':"Bank", 'field':"bankName", 'sortable':false},
		{'label':"Date Issued", 'field':"dateIssued", 'sortable':false},
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
		
		s.Result = v.getAllWithPageAndFilters(filters, function(result){
			console.log("Result : ", result._embedded.vouchers);
			s.data = result._embedded.vouchers;
			s.pageInfo = result.page;
		}, function(result){
			alert("Error in ajax!");
		});
	}

	s.VouchersGrid = {
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
							s.newItem.voucherNumber = row.voucherNumber;
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
							
							v.save(s.currentItem, function(result){
								$('#regen_modal').modal('hide');
								v.save(s.newItem, function(result){
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