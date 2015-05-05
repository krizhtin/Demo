mainSystemModule.controller('GridRaffleRouletteController', ['$scope', 'UserService', '$state', 'GroupService', '$rootScope', '$modal', function(s, u, st, als, rs, m) { // USER GRID

	// var a = [1,2,3];
	// a = a.reverse();
	// a.pop();
	// console.log(a);

	s.raffleRoulette = {};

	s.raffleRoulette.programCodeList = [
			{value: "sample1", name: "1st Sample"},
			{value: "sample2", name: "2st Sample"},
			{value: "sample3", name: "3st Sample"},
			{value: "sample4", name: "4st Sample"},
		];

	var d = new Date();
	s.raffleRoulette.draw_date = d.toString();

	$("#raffleRoulette_programCode").nz_jqxTooltip("Required value" , "hover");

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

	s.filterColumn = "card_nbr"; // DEFAULT Filter Column Dropdown
	s.$watch('filterColumn', function(newValue, oldValue){ // On Filter Column Change
		console.log(newValue, oldValue);
	});

	s.search = { // Default Sorting Values
		'card_nbr': "",
	}

	s.filter = { // Default Sorting Values
		sortColumn: "card_nbr",
		sortType: "asc"
	}

	s.perPageList = [ // Default Table Paging Options
		{text:"10 Per Page", value:10},
		{text:"20 Per Page", value:20},
		{text:"30 Per Page", value:30}
	];

	s.columns = [
		{ 'label': 'Prize Level', 'field': 'prize_level'},
		{ 'label': 'Prize', 'field': 'prize_item'},
		{ 'label': 'Card Number', 'field': 'card_nbr'},
		{ 'label': 'Account Name', 'field': 'acc_name1'},
		{ 'label': 'Mobile Number', 'field': 'mobl_phone'},
		{ 'label': 'Email Address', 'field': 'email_address'}
	];

	function refreshGrid() { // Refresh Table Data
		// s.usersResult = u.getAllWithFilter(s.pageInfo.number, s.pageInfo.size, s.filter.sortColumn, s.filter.sortType, s.search, function(result){
		// 	console.log("result : ", result);
		// 	s.data = result._embedded.users;
		// 	s.pageInfo = result.page;
		// });
		s.data = [{card_nbr:"Paullie"}];
	}

	s.bdoTable = {
		row: { // Table Row Buttons
			view: function (index, row) {
				st.go('View User Accounts', {user_id: row.id});
			},
			edit: function (index, row) {
				st.go('Edit User Accounts', {user_id: row.id});
			},
			delete: function (index, row) {
				// nz_init_confirmMessage("Are you sure you want to Delete?", function(){
				// 	u.delete(row, function(result){
				// 		nz_init_successMessage("Successfully deleted.");
				// 		refreshGrid();					
				// 	});
				// });
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

	refreshGrid();

	s.startroulette = function() { // start roulette
		validate(function(){

			nz_init_confirmMessage("Are you sure you want to draw?", function(){
				m.open( {
					templateUrl: 'js/nrs/view/raffleroulette/modal/form.html',
					controller: ['$scope', '$modalInstance', function(s, mi) {

						s.drawroll = "Draw Winners!";

						s.raffleRoulette = {};

						s.raffleRoulette.prizeList = [
							{value: "1m", name: "One Million Pesos"},
							{value: "2m", name: "Two Million Pesos"},
							{value: "3m", name: "Three Million Pesos"},
							{value: "4m", name: "Four Million Pesos"},
						];

						var validate = nz_validation(s, [

							{'model':'raffleRoulette.no_of_winners', 'id':'no_of_winners', 'conditions':{
								'onKeypress':{
									'Regex': new RegExp("^[0-9- ()]$", "i"),
								}, 'onSubmit':{
									'Regex': new RegExp("^[0-9- ()]+$"),
									'Required':true
								}, 'onBlur': {
									'Regex': new RegExp("^[0-9- ()]+$"),
									'Required':true
									}
								}
							},

							{'model':'raffleRoulette.prize_level', 'id':'prize_level', 'conditions':{
								'onKeypress':{
									'Regex': new RegExp("^[a-zA-Z0-9_ ]$", "i"),
								}, 'onSubmit':{
									'Regex': new RegExp("^[a-zA-Z0-9_ ]+$"),
									'Required':true
								}, 'onBlur': {
									'Regex': new RegExp("^[a-zA-Z0-9_ ]+$"),
									'Required':true
									}
								}
							},

							{'model':'raffleRoulette.prizeList', 'id':'prize_dropdown', 'conditions':{
								'onSubmit':{
									"Required":true,
									'Select': {
										'min':1
									}
								}, 'onBlur': {
									"Required":true,
									'Select': {
										'min':1
									}
									}
								}
							}
						]);

						s.init = function(){
							$("#prize_dropdown").nz_jqxTooltip("Required value" , "hover");
							$("#prize_level").nz_jqxTooltip("Required value<br>Alphanumeric" , "hover");
							$("#no_of_winners").nz_jqxTooltip("Required value<br>Numeric" , "hover");
						}

						s.raffleEnd = function(){
							console.log("asdf");
							mi.dismiss('cancel');
						};

						s.drawWinners = function(){
							validate(function(){
								$("#start").attr("disabled", false);
								$("#drawwinners").attr("disabled", "disabled");
								$("#prize_level").attr("disabled", "disabled");
								$("#prize_dropdown").attr("disabled", "disabled");
								$("#no_of_winners").attr("disabled", "disabled");
								$("#is_past_winner").attr("disabled", "disabled");
								$("#is_drawn_winner").attr("disabled", "disabled");
					
								// $("#no_of_entries").val(data[0].count);
								$("#remaining_slots").val($("#no_of_winners").val());
								$("#prize_level_winners").val(0);
							});
						};

						s.drawStart = function(){
							s.drawroll = "Drawing...";
							$("#start").attr("disabled", "disabled");
							setTimeout(function(){ 
								$("#stop").attr("disabled", false);
								var prize_level_winners = $("#prize_level_winners").val();
								var remaining_slots = $("#remaining_slots").val();
								prize_level_winners++;
								remaining_slots--;
								$("#prize_level_winners").val(prize_level_winners);
								$("#remaining_slots").val(remaining_slots); }, 3000);
						};

						s.drawStop = function(){
							
							s.drawroll = "Congratulations!";	

							m.open( {
								templateUrl: 'js/nrs/view/raffleroulette/modal/winner.html',
								controller: ['$scope', '$modalInstance', function(s, mi) {

									s.raffle_number = "rfl123sample";
									s.raffle_entry_id = "ntry123sample";
									s.account_name = "acc123sample";
									s.customer_number = "cus123sample";
									s.address = "add123sample";
									s.account_number = "acc123sample";
									s.email_address = "eml123@sample.com";
									s.card_number = "crd123sample";
									s.mobile_number = "mbl123sample";

									s.closeModal = function(){
										mi.dismiss('cancel');
										if($("#remaining_slots").val()>0){
											$("#start").attr("disabled", false);
											$("#stop").attr("disabled", "disabled");
										}else{
											$("#drawwinners").attr("disabled", false);
											$("#start").attr("disabled", "disabled");
											$("#stop").attr("disabled", "disabled");
											$("#prize_level").attr("disabled", false);
											$("#prize_dropdown").attr("disabled", false);
											$("#no_of_winners").attr("disabled", false);
											$("#done-button").attr("disabled", false);
										}
									};

								}],
								size: "md",
								backdrop: false
							});
						};

					}],
					size: "lg",
					backdrop: false
				});
			});

		});
	};

	// validation

	var validate = nz_validation(s, [
		{'model':'raffleRoulette.programCode', 'id':'raffleRoulette_programCode', 'conditions':{
			'onSubmit':{
				"Required":true,
				'Select': {
					'min':1
				}
			}, 'onBlur': {
				"Required":true,
				'Select': {
					'min':1
				}
				}
			}
		}

	]);
}]);