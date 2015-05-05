mainSystemModule.controller('FormRedemptionListController', ['$scope','$state','$stateParams','RedemptionRequestService','RedemptinStatusService', function(s, st, e, rr, rs) { // FORM
	s.form_view = true;

	s.redempReq = rr.getById(e.redemption_request_id, function(result){	});
	
	s.statuses = rs.getAll(function(result){
		s.redemptionStatus = result._embedded.redemptionStatuses;
	});

	s.edit_form = function(){
		$("#quantity").val(s.redempReq.quantity);
		$("#reason").val(s.redempReq.cancelReason);
		$("#rdmptn_area").val(s.redempReq.rdmptnArea);	
		s.rdmp_status = s.redempReq.rdmstatDesc;
		s.form_view = false;
	};

	s.save_form = function(){
		nz_init_confirmMessage("Are you sure you want to save changes?", function(){
			console.log("date: ",s.dt);
			nz_init_successMessage("Record successfully saved!", function(){
				st.go('Redemption List');
			});
		});
	};

	s.cancel_form = function(){
		nz_init_confirmMessage("Are you sure you want to cancel changes?", function(){
			s.$apply(function(){
				s.form_view = true;
			});	
		});
	};

	s.back = function(){
		st.go('Redemption List');
	};

	

	/*Date Picker*/
	s.today = function() {
		s.dt = new Date();
	};
	s.today();

	s.clear = function () {
		s.dt = null;
	};

	s.toggleMin = function() {
		s.minDate = s.minDate ? null : new Date();
	};
	s.toggleMin();

	s.open = function($event) {
		$event.preventDefault();
		$event.stopPropagation();

		s.opened = true;
	};	
}]);