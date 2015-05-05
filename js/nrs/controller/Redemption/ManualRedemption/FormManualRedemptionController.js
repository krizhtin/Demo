mainSystemModule.controller('FormManualRedemptionController', ['$scope','$state','$stateParams', function(s, st, e) { // FORM
	//Temporary values
	//--start
	s.account = "1-123-5465687";
	s.acc_name = "Mr. Sebache";
	s.card_num = "5147 2589 3677 4145";
	s.product = "Gold";
	s.close_code = "01";
	s.past_due = "500";
	s.exp_date = "12/02/2020";
	s.out_bal = "7500";
	//--end

	  $("#Modaldraggable").draggable({
	      handle: ".modal-header",
	      //backdrop: true,
          //backdropClick: true,
          //dialogFade: true,
          keyboard: true
          //templateUrl : 'modalContent.html',
          //controller : ModalInstanceCtrl,
	  });

	var tab_id = "";
	s.setTabID = function(TabID){
		 tab_id = TabID;
	}

	s.add_new = function(){
		
		//alert(tab_id);
	}

	/*----------COMMON-----GRID FUNCTION----------*/
	s.filterValue = ""; // DEFAULT Filter Value
	
	s.perPageList = [ // Default Table Paging Options
		{text:"10 Per Page", value:10},
		{text:"20 Per Page", value:20},
		{text:"30 Per Page", value:30}
	];

	/*----------CATALOGUE ITEMS-----GRID FUNCTION----------*/
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
		{'label':"Redemption Code", 'field':"redemption_request_id", 'sortable':false},
		{'label':"Card Number", 'field':"card_nbr", 'sortable':false},
		{'label':"Account Name", 'field':"acc_name", 'sortable':false},
		{'label':"Item Code", 'field':"item_code", 'sortable':false},
		{'label':"Item Description", 'field':"item_desc", 'sortable':false},
		{'label':"Quantity", 'field':"quantity", 'sortable':false},
		{'label':"Status", 'field':"catalogue_status_name", 'sortable':false}
	];

	function refreshGrid() { // Refresh Table Data
		s.data = [
			{redemption_request_id:"1",
			card_nbr:"5125 6000 1234 5613",
			acc_name:"Mr. Sebache",
			item_code:"001",
			item_desc:"SAMSUNG TV",
			quantity:"10",
			catalogue_status_name:"NEW"}
		];
	}

	s.CatalogueGrid = {
		row: { // Table Row Buttons
			view: function (index, row) {
				
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
		}
	};
	refreshGrid();

	/*----------COUPONS-----GRID FUNCTION----------*/
	s.pageInfo2 = { // Default Page Info
		last: false,
		totalPages: 1,
		totalElements: 1,
		size: 10,
		number: 0,
		numberOfElements: 10,
		first: true
	};

	s.columns2 = [ // Default Columns ( 'Label' is display name, 'field' is datafield name, 'sortable' enables sorting for the column)
		{'label':"Coupon Number", 'field':"coupon_number", 'sortable':false},
		{'label':"Item Code", 'field':"item_code", 'sortable':false},
		{'label':"Account Number", 'field':"account", 'sortable':false},
		{'label':"Name", 'field':"acc_name", 'sortable':false},
		{'label':"Bank", 'field':"bank_name", 'sortable':false},
		{'label':"Data Issued", 'field':"date_issued", 'sortable':false},
		{'label':"Issue Number", 'field':"issue_num", 'sortable':false},
		{'label':"Status", 'field':"status", 'sortable':false},
		{'label':"Remarks", 'field':"remarks", 'sortable':false}
	];

	function refreshGrid2() { // Refresh Table Data
		s.data2 = [
			{coupon_number:"001",
			item_code:"5125",
			account:"1-145-2587514",
			acc_name:"Mr. Antpako",
			bank_name:"BDO",
			date_issued:"10/25/2014",
			issue_num:"0025",
			status:"New Redemption",
			remarks:"NONE"}
		];
	}

	s.CouponsGrid = {
		row: { // Table Row Buttons
			view: function (index, row) {
				
			},
			edit: function (index, row) {
				
			},
			delete: function (index, row) {
				
			}
		},
		pagination: { // Table Paginations
			next: function () {
				if(s.pageInfo2.number < s.pageInfo2.totalPages-1) {
					s.pageInfo2.number++;
					refreshGrid2()
				}
			},
			previous: function () {
				if(s.pageInfo2.number !=  0) {
					s.pageInfo2.number--;
					refreshGrid2()
				}
			},
			page: function (page) {
				s.pageInfo2.number = page-1;
				refreshGrid2();
			},
			perPage: function (perPage) {
				s.pageInfo2.size = perPage;
				refreshGrid2();
			}
		}
	};
	refreshGrid2();

	/*----------VOUCHERS-----GRID FUNCTION----------*/
	s.pageInfo3 = { // Default Page Info
		last: false,
		totalPages: 1,
		totalElements: 1,
		size: 10,
		number: 0,
		numberOfElements: 10,
		first: true
	};

	s.columns3 = [ // Default Columns ( 'Label' is display name, 'field' is datafield name, 'sortable' enables sorting for the column)
		{'label':"Voucher Number", 'field':"voucher_number", 'sortable':false},
		{'label':"Item Code", 'field':"item_code", 'sortable':false},
		{'label':"Account Number", 'field':"account", 'sortable':false},
		{'label':"Name", 'field':"acc_name", 'sortable':false},
		{'label':"Bank", 'field':"bank_name", 'sortable':false},
		{'label':"Data Issued", 'field':"date_issued", 'sortable':false},
		{'label':"Issue Number", 'field':"issue_num", 'sortable':false},
		{'label':"Status", 'field':"status", 'sortable':false},
		{'label':"Remarks", 'field':"remarks", 'sortable':false}
	];

	function refreshGrid3() { // Refresh Table Data
		s.data3 = [
			{voucher_number:"005",
			item_code:"5858",
			account:"1-145-2587514",
			acc_name:"Mr. Antpako",
			bank_name:"BDO",
			date_issued:"02/02/2015",
			issue_num:"0125",
			status:"New Redemption",
			remarks:"NONE"}
		];
	}

	s.VouchersGrid = {
		row: { // Table Row Buttons
			view: function (index, row) {
				
			},
			edit: function (index, row) {
				
			},
			delete: function (index, row) {
				
			}
		},
		pagination: { // Table Paginations
			next: function () {
				if(s.pageInfo3.number < s.pageInfo3.totalPages-1) {
					s.pageInfo3.number++;
					refreshGrid3()
				}
			},
			previous: function () {
				if(s.pageInfo3.number !=  0) {
					s.pageInfo3.number--;
					refreshGrid3()
				}
			},
			page: function (page) {
				s.pageInfo3.number = page-1;
				refreshGrid3();
			},
			perPage: function (perPage) {
				s.pageInfo3.size = perPage;
				refreshGrid3();
			}
		}
	};
	refreshGrid3();

	/*----------CATALOGUE ITEMS MODAL-----GRID FUNCTION----------*/
	s.pageInfo4 = { // Default Page Info
		last: false,
		totalPages: 1,
		totalElements: 1,
		size: 10,
		number: 0,
		numberOfElements: 10,
		first: true
	};

	s.columns4 = [ // Default Columns ( 'Label' is display name, 'field' is datafield name, 'sortable' enables sorting for the column)
		{'label':"Item Code", 'field':"item_code", 'sortable':false},
		{'label':"Item Category", 'field':"item_cat", 'sortable':false},
		{'label':"Description", 'field':"desc", 'sortable':false},
		{'label':"Status", 'field':"status", 'sortable':false}
	];

	function refreshGrid4() { // Refresh Table Data
		s.data4 = [
			{item_code:"001",
			item_cat:"TV",
			desc:"SAMUNG TV",
			status:"Available"},

			{item_code:"002",
			item_cat:"PRINTER",
			desc:"EPSON 3600",
			status:"Available"},

			{item_code:"003",
			item_cat:"LAPTOP",
			desc:"VAIO",
			status:"Available"}
		];
	}

	s.CatalogueSearchGrid = {
		row: { // Table Row Buttons
			view: function (index, row) {
				$('#fasttrack1').modal();
			},
			edit: function (index, row) {
				
			},
			delete: function (index, row) {
				
			}
		},
		pagination: { // Table Paginations
			next: function () {
				if(s.pageInfo4.number < s.pageInfo4.totalPages-1) {
					s.pageInfo4.number++;
					refreshGrid4()
				}
			},
			previous: function () {
				if(s.pageInfo4.number !=  0) {
					s.pageInfo4.number--;
					refreshGrid4()
				}
			},
			page: function (page) {
				s.pageInfo4.number = page-1;
				refreshGrid4();
			},
			perPage: function (perPage) {
				s.pageInfo4.size = perPage;
				refreshGrid4();
			}
		}
	};
	refreshGrid4();

}]);