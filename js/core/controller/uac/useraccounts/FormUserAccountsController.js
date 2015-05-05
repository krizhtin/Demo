mainSystemModule.controller('FormUserAccountsController', ['$scope', '$http', 'UserService', '$state', '$stateParams', 'BankService', 'AccessLevelService', 'GroupService', function(s, h, u, st, e, b, a, g, nzV) { // Form Initializer

	s.$watch('user.expiryDate', function(value){
		console.log(value);

	})

	if(e.id) {
		s.formTitle = 'Edit User';
		s.user = {};
		fetchAllData(function(){
			u.getById(e.id, function(result){
				s.user = result;
				s.user.expiryDate = dateReformatter(new Date(s.user.expiryDate));
				if(s.user.status == "New") s.user.status = "Active";

				if(s.user.groups.hasOwnProperty("_embedded")) {
					for(var i=0; i< s.user.groups._embedded.groups.length; i++) {
						var value1 = s.user.groups._embedded.groups[i];
						for(var x=0; x<s.groupsList.length; x++) {
							var value2 = s.groupsList[x];
							if(value1.groupCode == value2.groupCode) {
								value2.ticked = true;
							}
						}
					}
				}

				if(s.user.banks.hasOwnProperty("_embedded")) {
					for(var i=0; i< s.user.banks._embedded.banks.length; i++) {
						var value1 = s.user.banks._embedded.banks[i];
						for(var x=0; x<s.banksList.length; x++) {
							var value2 = s.banksList[x];
							if(value1.code == value2.code) {
								value2.ticked = true;
							}
						}
					}
				}

				$("#user_name").prop('disabled', true);
			});
		});
		s.statusList = ["Active", "	Inactive"];
	}
	else {
		s.formTitle = 'Add User';
		s.user = {};
		s.user.expiryDate = dateReformatter(new Date());
		s.statusList = ["New"];
		s.user.status = "New";
		fetchAllData();
	}

	function fetchAllData(callback) {
		a.getAll(function(resultAccessLevels){ // GET ALL ACCESS LEVEL
			s.accessLevelsList = resultAccessLevels._embedded.accessLevels;
			b.getAll(function(resultBanks){ // GET ALL BANKS LIST
				console.log("Banks List : ", resultBanks._embedded.banks);
				g.getAll(function(resultGroups){ // GET ALL GROUP LIST
					console.log("Groups List : ", resultGroups._embedded.groups);
					s.groupsList = [];
					$.each(resultGroups._embedded.groups, function(idx, value){
						value["ticked"] = false;
						s.groupsList.push(value);
					});
					if(callback) callback();
				});
				s.banksList = [];
				$.each(resultBanks._embedded.banks, function(idx, value){
					value["ticked"] = false;
					s.banksList.push(value);
				});
			});
		});
	}

	var emailRegex = new RegExp("[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)", "i");
	$("#user_name").nz_jqxTooltip("Required value</br>Alphanumeric</br>Unique value</br>No whitespace</br>minimum of 3 characters</br>maximum of 30 characters" , "hover");	
	$("#user_email").nz_jqxTooltip("Required value</br>Email format" , "hover");
	$("#user_firstName").nz_jqxTooltip("Required value</br>Minimum of 3 characters</br>Maximum of 30 characters" , "hover");
	$("#user_contactDetails").nz_jqxTooltip("Required value</br>Numeric</br>Accepts '( ) -'</br>Maximum of 25 characters'" , "hover");
	$("#user_middleName").nz_jqxTooltip("Optional value</br>Maximum of 30 characters" , "hover");
	$("#user_department").nz_jqxTooltip("Optional value</br>Maximum of 30 characters" , "hover");
	$("#user_position").nz_jqxTooltip("Optional value</br>Maximum of 30 characters" , "hover");
	$("#user_surname").nz_jqxTooltip("Optional value</br>Maximum of 15 characters" , "hover");
	$("#user_location").nz_jqxTooltip("Required value</br>Maximum of 50 characters" , "hover");
	$("#user_surname").nz_jqxTooltip("Required value</br>Minimum of 3 characters</br>Maximum of 30 characters" , "hover");
	$("#user_expiryDate").nz_jqxTooltip("Required value" , "hover");
	$("#user_accessLevel").nz_jqxTooltip("Required value" , "hover");
	$("#user_banks").nz_jqxTooltip("Required value" , "hover");
	$("#user_groups").nz_jqxTooltip("Required value" , "hover");
	$("#user_status").nz_jqxTooltip("Required value" , "hover");
	$("#user_remarks").nz_jqxTooltip("Optional value</br>Maximum of 50 characters" , "hover");

	s.groupsList = [];
	s.selectedGroupsList = []; 
	s.accessLevelsList = [];
	s.selectedBanksList = [];
	s.banksList = [];

	$( '.input-date' ).datetimepicker({
		pickTime: false,
		useCurrent: false
	});

	var usernameValidation = {'model':'user.username', 'id':'user_name', 'minlength':3, 'maxlength':30, 'conditions':{
		'onKeypress':{
			'Regex': new RegExp("^[a-zA-Z0-9_]$", "i")
		}, 'onSubmit':{
			'Regex': new RegExp("^[a-zA-Z0-9_]+$"),
					// 'Unique': {
					// 	'Service': u.getByUsername;
					// }
					'Required':true
				}, 'onBlur': {
					'Regex': new RegExp("^[a-zA-Z0-9_]+$"),
					// 'Unique': {
					// 	'Service': u.getByUsername;
					// }
					'Required':true
				}
			}
		};

		if(e.id) {
			usernameValidation = {'model':'user.username', 'id':'user_name', 'minlength':3, 'maxlength':30, 'conditions':{}
		}
	}

	var validate = nz_validation(s, [
		usernameValidation,

		{'model':'user.email', 'id':'user_email', 'minlength':0, 'maxlength':250, 'conditions':{
			'onKeypress':{
				'Regex': new RegExp("^[a-zA-Z0-9_@.]$", "i"),
			}, 'onSubmit':{
				'Regex': emailRegex,
					// '	Unique': {
					// 	'Service': function(){};
					// }
					'Required':true
				}, 'onBlur': {
					'Regex': emailRegex,
					'Required':true
				}
			}
		},

		{'model':'user.firstName', 'id':'user_firstName', 'minlength':3, 'maxlength':30, 'conditions':{
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

	{'model':'user.contactDetails', 'id':'user_contactDetails', 'minlength':0, 'maxlength':25, 'conditions':{
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

{'model':'user.middleName', 'id':'user_middleName', 'minlength':1, 'maxlength':30, 'conditions':{
	'onKeypress':{
		'Regex': new RegExp("^[a-zA-Z0-9_ ]$", "i"),
	}, 'onSubmit':{
		'Regex': new RegExp("^[a-zA-Z0-9_ ]+$"),
	}, 'onBlur': {
		'Regex': new RegExp("^[a-zA-Z0-9_ ]+$"),
	}
}
},

{'model':'user.department', 'id':'user_department', 'minlength':0, 'maxlength':30, 'conditions':{
	'onKeypress':{
		'Regex': new RegExp("^[a-zA-Z0-9_ ]$", "i"),
	}, 'onSubmit':{
		'Regex': new RegExp("^[a-zA-Z0-9_ ]+$"),
	}, 'onBlur': {
		'Regex': new RegExp("^[a-zA-Z0-9_ ]+$"),
	}
}
},

{'model':'user.position', 'id':'user_position', 'minlength':0, 'maxlength':30, 'conditions':{
	'onKeypress':{
		'Regex': new RegExp("^[a-zA-Z0-9_ ]$", "i"),
	}, 'onSubmit':{
		'Regex': new RegExp("^[a-zA-Z0-9_ ]+$"),
	}, 'onBlur': {
		'Regex': new RegExp("^[a-zA-Z0-9_ ]+$"),
	}
}
},

{'model':'user.location', 'id':'user_location', 'minlength':1, 'maxlength':30, 'conditions':{
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

{'model':'user.surname', 'id':'user_surname', 'minlength':3, 'maxlength':30, 'conditions':{
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

{'model':'user.expiryDate', 'id':'user_expiryDate', 'conditions':{
	'onKeypress':{
		'Disabled': true,
	}, 'onChange':{
		'Date': {
			"minDate": new Date(),
			"maxDate": new Date().setDate(new Date().getDate()+30),
		},
	}, 'onSubmit':{
		'Regex': new RegExp("^[a-zA-Z0-9_ ]$", "i"),
	}, 'onBlur': {
		'Regex': new RegExp("^[a-zA-Z0-9_ ]$", "i"),
	}
}
},

{'model':'user.accessLevel', 'id':'user_accessLevel', 'conditions':{
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
},

{'model':'selectedBanksList', 'id':'user_banks','conditions':{
	'onSubmit':{
		"Required":true,
		'Select': {}
	}, 'onBlur': {
		"Required":true,
		'Select': {}
	}
}
},

{'model':'selectedGroupsList', 'id':'user_groups', 'conditions':{
	'onSubmit':{
		'Required':true,
		'Select': {}
	}, 'onBlur': {
		'Required':true,
		'Select': {}
	}
}
},

{'model':'user.status', 'id':'user_status', 'conditions':{
	'onSubmit':{
		'Required':true,
		'Select': {}
	}, 'onBlur': {
		'Required':true,
		'Select': {}
	}
}
},

{'model':'user.user_remarks', 'id':'user_remarks', 'minlength':0, 'maxlength':50, 'conditions':{}
}

]);


	s.save_button = function() { // SAVE FUNCTION IF ADD
		validate(function(){


			nz_init_confirmMessage("Are you sure you want to save?", function(){
				var  edtemp = ""+s.user.expiryDate;
				s.user.expiryDate = new Date(s.user.expiryDate);
				var temp = s.user.accessLevel;
				s.user.accessLevel = s.user.accessLevel._links.self.href;

				s.user.banks = [];
				$.each(s.selectedBanksList, function(idx, value){
					s.user.banks.push(value._links.self.href);
				});

				s.user.groups = [];
				$.each(s.selectedGroupsList, function(idx, value){
					s.user.groups.push(value._links.self.href);
				});
				u.save(s.user, function(result){
					nz_init_successMessage("Successfully saved!", function(){
						st.go('User Accounts');
					});
				}, function(result){
					nz_init_errorMessage(result);
				});
				s.user.accessLevel = temp;
				s.user.expiryDate = edtemp;
			});
		});
	};

	s.cancel_button = function() { // CANCEL FUNCTION
		nz_init_confirmMessage("Are you sure you want to discard changes?", function() {
			st.go('User Accounts');
		});
	};

}]);