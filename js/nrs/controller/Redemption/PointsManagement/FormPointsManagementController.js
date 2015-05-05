mainSystemModule.controller('FormPointsManagementController', ['$scope','$state','$stateParams', function(s, st, e) { // FORM
	//Temporary values
	//--start
	s.card_num = "5125 6000 1234 5613";
	s.acct_num = "1-480-4891127";
	s.ch_name = "IBM";
	s.cust_num = "007";

	s.benifitiary_card_num = "5069 3459 9475 8123";
	s.benifitiary_acc_name = "SAMSUNG";
	s.benifitiary_product = "MONITOR";
	//--end

	/*--Hide form save and cancel button--*/
	s.save_cancel_button = "false";

	/*--Hold or Lift dropdown--*/
	s.holdlift_action = [
		{name : 'Hold Points', value : 'holdpts'},
		{name : 'Lift Points', value : 'liftpts'}
	];
	s.hlaction = s.holdlift_action[0].value;

	/*--Form Action dropdown--*/
	s.select_action = [
		{name : 'Select', value : 'select'},
		{name : 'Points Transfer', value : 'transfer'},
		{name : 'Points Pooling', value : 'pooling'},
		{name : 'Points Adjustment', value : 'adjustment'},
		{name : 'Points Holding / Lifting', value : 'holdlift'}
	];
	s.action = s.select_action[0].value;

	s.selectedItemChanged = function(){    
    	s.transfer_form = "false";	
       if(s.action == 'select'){
            s.save_cancel_button = "false";
        }
       else if(s.action == 'transfer'){
        	$('#transfermodal').modal();
        }
       else{
            s.save_cancel_button = "true";
        }
  	}

  	/*--Main Form Functions--*/
  	s.save_button = function() {
  		nz_init_confirmMessage("Are you sure you want to save changes?", function() {
	  		if(s.action == "transfer"){
	  			alert($("#pts_to_transfer").val());
	  		}else if(s.action == "pooling"){

	  		}else if(s.action == "adjustment"){
	  			alert($("#pts_to_adjust").val());
	  		}else if(s.action == "holdlift"){
	  			alert($("#pts_to_holdlift").val());
	  			alert(s.hlaction);
	  		}	
  		});
  	};

  	s.cancel_button = function() { // CANCEL FUNCTION
		nz_init_confirmMessage("Are you sure you want to discard changes?", function() {
			
		});
	};

	/*--Enable Modal Draggable--*/
	$("#Modaldraggable").draggable({
	      handle: ".modal-header",
          keyboard: true
	});

	/*--Transfer Modal Functions--*/
  	s.search = function(){
  		//populate grid data
  	};

  	/*--Pooling Modal Functions--*/
  	s.poolpts_save = function(){
  		alert($("#sub_card_nbr").val());
  		$('#poolmodal').modal('hide');
  		s.total_pool_pts = $("#sub_card_nbr").val()
  	};

  	s.poolpts_cancel = function(){
		nz_init_confirmMessage("Are you sure you want to discard changes?", function() {
			$('#poolmodal').modal('hide');
		});
  	};

	/*----------GRID COMMON FUNCTION----------*/
	s.filterValue = ""; // DEFAULT Filter Value
	
	s.perPageList = [ // Default Table Paging Options
		{text:"10 Per Page", value:10},
		{text:"20 Per Page", value:20},
		{text:"30 Per Page", value:30}
	];
	/*----------ACCOUNT HOLDER INFORMARTION ----- GRID FUNCTION----------*/
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
		{'label':"Card Number", 'field':"card_num", 'sortable':false},
		{'label':"Beginning Balance", 'field':"bal_beginning", 'sortable':false},
		{'label':"Earned", 'field':"bal_earn", 'sortable':false},
		{'label':"Adjustments", 'field':"bal_adjust", 'sortable':false},
		{'label':"Bonus", 'field':"bal_bonus", 'sortable':false},
		{'label':"Redeemed", 'field':"bal_redeem", 'sortable':false},
		{'label':"On Hold", 'field':"bal_hold", 'sortable':false},
		{'label':"Expired", 'field':"bal_expired", 'sortable':false},
		{'label':"Ending Balance", 'field':"ending_bal", 'sortable':false}
	];

	function refreshGrid() { // Refresh Table Data
		s.data = [
			{card_num:"5125 6000 1234 5613",
			bal_beginning:"1000",
			bal_earn:"1000",
			bal_adjust:"1000",
			bal_bonus:"1000",
			bal_redeem:"1000",
			bal_hold:"1000",
			bal_expired:"1000",
			ending_bal:"1000"},
		];
	}

	s.CurrentPoints = {
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
		}
	};
	refreshGrid();

	/*----------POINTS TRANSFER CARDS INFORMARTION ----- GRID FUNCTION----------*/
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
		{'label':"Bank", 'field':"bank", 'sortable':false},
		{'label':"Account Number", 'field':"acct_num", 'sortable':false},
		{'label':"Customer Number", 'field':"cust_num", 'sortable':false},
		{'label':"Account Name", 'field':"acc_name", 'sortable':false},
		{'label':"Card Number", 'field':"card_num", 'sortable':false},
		{'label':"Product", 'field':"product", 'sortable':false},
		{'label':"Card Profile", 'field':"card_profil", 'sortable':false}
	];

	function refreshGrid2() { // Refresh Table Data
		s.data2 = [
			{bank:"BDO",
			acct_num:"1-245-9581754",
			cust_num:"008",
			acc_name:"Mr. Antpako",
			card_num:"5164 6123 5612 1185",
			product:"VVIP",
			card_profil:"VIP"}
		];
	}

	s.BeneficiaryInfo = {
		row: { // Table Row Buttons
			view: function (index, row) {
				
			},
			edit: function (index, row) {
				$('#transfermodal').modal('hide');
  				s.transfer_form = "true";

				s.beneficiary_card_num = $("#enter_card_nbr").val();
  				s.beneficiary_acc_name = "sample name";
  				s.beneficiary_product = "sample product";

  				s.save_cancel_button = "true";
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

	/*----------POINTS POOLING CARDS INFORMARTION ----- GRID FUNCTION----------*/
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
		{'label':"Product", 'field':"product", 'sortable':false},
		{'label':"Principal Card Number", 'field':"card_num", 'sortable':false},
		{'label':"Current Point Balance (Account Level)", 'field':"bal_current", 'sortable':false},
		{'label':"Specific Points to Pool", 'field':"pts_pool", 'sortable':false},
		{'label':"New Point Balance", 'field':"bal_new", 'sortable':false}
	];

	function refreshGrid3() { // Refresh Table Data
		s.data3 = [
			{product:"SAMSUNG",
			card_num:"5125 6000 1234 5613",
			bal_current:"1000",
			pts_pool:"1000",
			bal_new:"1000"},
		];
	}

	s.PoolingTable = {
		row: { // Table Row Buttons
			view: function (index, row) {
				
			},
			edit: function (index, row) {
				$('#poolmodal').modal();
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

}]);