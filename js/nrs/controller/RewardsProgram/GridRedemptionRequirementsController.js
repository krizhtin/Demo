angular.module("mainSystemModule").controller('GridRedemptionRequirementsController', ['$scope', '$state', '$stateParams', 'ReferenceTableService', '$modal', 'FormRewardService',
																						'RewardItemService', 'CouponsService', 'VoucherService', 'RaffleEntriesService',
 																						function(s, rt, sp, r, m, fr, ri, c, v, re) { // Form Initializer

	s.pageInfo = { // Default Page Info
		last: false,
		totalPages: 1,
		totalElements: 1,
		size: 10,
		number: 0,
		numberOfElements: 10,
		first: true
	};

	s.filter = { // Default Sorting Values
		sortColumn: "tabName",
		sortType: "asc"
	}

	s.perPageList = [ // Default Table Paging Options
		{text:"10 Per Page", value:10},
		{text:"20 Per Page", value:20},
		{text:"30 Per Page", value:30}
	];

	s.columns = [ // Default Columns ( 'Label' is display name, 'field' is datafield name, 'sortable' enables sorting for the column)
		{'label':"Label", 'field':"label", 'sortable':true},
		{'label':"Condition Program", 'field':"condition", 'sortable':true},
		{'label':"Form of Reward", 'field':"reward", 'sortable':true},
		{'label':"Item Code", 'field':"item", 'sortable':true},
		{'label':"Formula", 'field':"formula", 'sortable':true},
		{'label':"Remarks", 'field':"remarks", 'sortable':true}
	];

	s.data = [
		{"label":"1l", "condition":"1c", "reward":"1r", "item":"1i", "formula":"1f", "remarks":"1r"},
		{"label":"2l", "condition":"2c", "reward":"2r", "item":"2i", "formula":"2f", "remarks":"2r"},
		{"label":"3l", "condition":"3c", "reward":"3r", "item":"3i", "formula":"3f", "remarks":"3r"}
	];

	function refreshGrid() { // Refresh Table Data
		s.data = s.data;
	}

	function cancel(index, row) {
		s.data[index] = row;
	}

	function create(row) {
		s.data.push(row);
	}

	s.bdoTable = {
		row: { // Table Row Buttons
			edit: function (index, row) {
				var base = JSON.parse(JSON.stringify(row));

				m.open( {
					templateUrl: 'js/nrs/view/rewardsprogram/computations/redemptionrequirements/form.html',
					controller: ['$scope', '$modalInstance', function(s, mi) {

						s.row = row;
						s.row.rewardId = "";
						s.result = fr.getAll(function(result){
							s.rewards = result._embedded.formRewards;
							s.pageInfo = result.page;
						});

						s.$watch("row.rewardId", function(){
							s.codes = [];
							switch(s.rewards[s.row.rewardId].modelName){
								case "RewardItem":
									s.result = ri.getAll(function(result){
										s.items = result._embedded.rewardItems;
										for(x=0;x<result._embedded.rewardItems.length;x++ ){
											s.codes[x] = result._embedded.rewardItems[x].itemCode;
										}
										s.pageInfo = result.page;
									});
									break;
								case "Coupon":
									s.result = c.getAll(function(result){
										console.log("result", result);
										s.items = result._embedded.coupons;
										for(x=0;x<result._embedded.coupons.length;x++ ){
											s.codes[x] = result._embedded.coupons[x].couponNumber;
										}
										s.pageInfo = result.page;
									});
									break;
								case "Voucher":
									s.result = v.getAll(function(result){
										s.items = result._embedded.vouchers;
										for(x=0;x<result._embedded.vouchers.length;x++ ){
											s.codes[x] = result._embedded.vouchers[x].voucherNumber;
										}
										s.pageInfo = result.page;
									});
									break;
								case "RaffleEntry":
									s.result = re.getAll(function(result){
										s.items = result._embedded.raffleEntries;
										for(x=0;x<result._embedded.raffleEntries.length;x++ ){
											s.codes[x] = result._embedded.raffleEntries[x].raffleNbr;
										}
										s.pageInfo = result.page;
									});
									break;
								default:
									s.codes = "none";
							};
						});

						s.save = function(){
							s.row.reward = s.rewards[s.row.rewardId].rewardName;
							s.row.item = s.codes[s.row.itemId];
							console.log(s.row);
							mi.dismiss('Cancel');
						}
				
						s.cancel = function(){
							cancel(index, base);
							mi.dismiss('Cancel');
						}

					}],
					size: "md",
					backdrop: false
				});

			},
			delete: function (index, row) {
				s.data.splice(index, 1);
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

	s.$on('redemptionRequirements', function () {

		m.open( {
			templateUrl: 'js/nrs/view/rewardsprogram/computations/redemptionrequirements/form.html',
			controller: ['$scope', '$modalInstance', function(s, mi) {//ri, c, v, re

				s.row = {};
				s.row.rewardId = "";
				s.result = fr.getAll(function(result){
					s.rewards = result._embedded.formRewards;
					s.pageInfo = result.page;
				});

				s.$watch("row.rewardId", function(){
					s.codes = [];
					switch(s.rewards[s.row.rewardId].modelName){
						case "RewardItem":
							s.result = ri.getAll(function(result){
								s.items = result._embedded.rewardItems;
								for(x=0;x<result._embedded.rewardItems.length;x++ ){
									s.codes[x] = result._embedded.rewardItems[x].itemCode;
								}
								s.pageInfo = result.page;
							});
							break;
						case "Coupon":
							s.result = c.getAll(function(result){
								console.log("result", result);
								s.items = result._embedded.coupons;
								for(x=0;x<result._embedded.coupons.length;x++ ){
									s.codes[x] = result._embedded.coupons[x].couponNumber;
								}
								s.pageInfo = result.page;
							});
							break;
						case "Voucher":
							s.result = v.getAll(function(result){
								s.items = result._embedded.vouchers;
								for(x=0;x<result._embedded.vouchers.length;x++ ){
									s.codes[x] = result._embedded.vouchers[x].voucherNumber;
								}
								s.pageInfo = result.page;
							});
							break;
						case "RaffleEntry":
							s.result = re.getAll(function(result){
								s.items = result._embedded.raffleEntries;
								for(x=0;x<result._embedded.raffleEntries.length;x++ ){
									s.codes[x] = result._embedded.raffleEntries[x].raffleNbr;
								}
								s.pageInfo = result.page;
							});
							break;
						default:
							s.codes = "none";
					};
				});

				s.save = function(){
					s.row.reward = s.rewards[s.row.rewardId].rewardName;
					s.row.item = s.codes[s.row.itemId];
					console.log(s.row);
					create(s.row);
					mi.dismiss('Cancel');
				}
		
				s.cancel = function(){
					mi.dismiss('Cancel');
				}

			}],
			size: "md",
			backdrop: false
		});
	});

}]);
