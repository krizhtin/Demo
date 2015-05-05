mainSystemModule.controller('ViewUserAccountsController', ['$scope', '$stateParams', 'UserService', '$state', function(s, e, u, st) { // Form Initializer
	s.user = u.getById(e.user_id, function(result){
		console.log("viewUser :", result);
		s.user.groupProfileList = "";
		var count = 0;
		var temp = "";
		$.each(s.user.groups._embedded.groups, function(idx, value){
			console.log(idx);
			if (idx == 4) {
				if(temp == "") temp = s.user.groupProfileList;
				count++;
				s.user.groupProfileList = temp + " + " + count + " more";
			}
			else if(idx <= 3 && s.user.groupProfileList == "") {
				s.user.groupProfileList = value.groupName;
			}
			else if(idx <= 3){
				s.user.groupProfileList += ", " + value.groupName;
			}
		});
	});
	

	s.back_button = function() {
		st.go('User Accounts');
	}
}]);