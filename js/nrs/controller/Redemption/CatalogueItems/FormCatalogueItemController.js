mainSystemModule.controller('FormCatalogueItemController', ['$scope','$state','$stateParams', function(s, st, e) { // FORM

	if(e.item_id){
		s.form_view = true;
		//Temporary Data
		//s.bank = "BDO";
		//s.status = "Available";
		s.item_code = "003";
		s.catalogue = "TV";
		s.item_desc = "SAMSUNG TV";
		//s.service_provider = "SAMSUNG";
		//s.item_category = "Electrical";

		s.cancel_form = function(){
			nz_init_confirmMessage("Are you sure you want to cancel changes?", function(){
				s.$apply(function(){
	               s.form_view = true;
	            });	
			});
		}
	}else{
		s.form_view = false;

		s.cancel_form = function(){
			nz_init_confirmMessage("Are you sure you want to cancel changes?", function(){
				st.go('Catalogue Items');	
			});
		}
	}	

	s.edit_form = function(){
		s.form_view = false;
		$("#bank").val(s.bank);
		$("#status").val(s.status);
		$("#item_code").val(s.item_code);
		$("#catalogue").val(s.catalogue);
		$("#item_desc").val(s.item_desc);
		$("#service_provider").val(s.service_provider);
		$("#item_category").val(s.item_category);
	}

	s.save_form = function(){
		nz_init_confirmMessage("Are you sure you want to save changes?", function(){
			s.$apply(function(){
	            s.form_view = true;
	            s.bank = $("#bank").val();
				s.status = $("#status").val();
				s.item_code = $("#item_code").val();
				s.catalogue = $("#catalogue").val();
				s.item_desc = $("#item_desc").val();
				s.service_provider = $("#service_provider").val();
				s.item_category = $("#item_category").val();		
            });
						
		});
	}

	/*----------MODAL FUNCTIONS----------*/
	s.save_modal = function(){
		nz_init_confirmMessage("Are you sure you want to save changes?", function(){
			$('#myModal').modal('hide');				
		});
	}

	s.cancel_modal = function(){
		nz_init_confirmMessage("Are you sure you want to cancel changes?", function(){
			$('#myModal').modal('hide');				
		});
	}

	/*----------VOUCHERS-----GRID FUNCTION----------*/
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
		{'label':"Redemption Type", 'field':"redmpt_type", 'sortable':false},
		{'label':"Points Required", 'field':"pts_req", 'sortable':false},
		{'label':"Increments", 'field':"increments", 'sortable':false},
		{'label':"Fast Track Cash", 'field':"fast_track", 'sortable':false},
		{'label':"Partner", 'field':"partner", 'sortable':false},
		{'label':"Conversion", 'field':"conversion", 'sortable':false}
	];

	function refreshGrid() { // Refresh Table Data
		s.data = [
			{redmpt_type:"type",			
			pts_req:"100",
			increments:"10",
			fast_track:"500",			
			partner:"SAMSUNG",
			conversion: "10"}
		];
	}

	s.RedemptionReq = {
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
}]);