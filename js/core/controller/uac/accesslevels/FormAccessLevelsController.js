mainSystemModule.controller('FormAccessLevelsController', ['$scope', 'AccessLevelService', '$state', '$stateParams', function(s, a, st, e) { // Form Initializer
	if(e.id) {
		s.formTitle = 'Edit Access Level';

		a.getAll(function( result ){
			s.accessLevelsList = result._embedded.accessLevels; 
			s.accessLevel = a.getById(e.id, function(result){
				console.log("Edited Access Level :", result);
			});
		});
	}
	else {
		s.formTitle = 'Create Access Level';
		s.accessLevel = {};

		a.getAll(function( result ){
			s.accessLevelsList = result._embedded.accessLevels;
			s.accessLevel["parentAccessLevel"] = {"_links":{"self":{"href":s.accessLevelsList[0]._links.self.href}}};
		});
	}

	$("#accessLevel_accessLevelName").nz_jqxTooltip("Required value</br>Minumum of 5 characters</br>Maximum of 30 characters", "hover");
	$("#accessLevel_parentAccessLevel").nz_jqxTooltip("Optional value", "hover");

	var validate = nz_validation(s, [
		{'model':'accessLevel.accessLevelName', 'id':'accessLevel_accessLevelName', 'minlength':5, 'maxlength':30, 'conditions':{
			'onKeypress':{
				'Regex': new RegExp("^[a-zA-Z0-9_ ]$", "i")
			}, 'onSubmit':{
				'Regex': new RegExp("^[a-zA-Z0-9_ ]+$"),
					// 'Unique': {
					// 	'Service': u.getByUsername;
					// }
				'Required':true
			}, 'onBlur': {
					'Regex': new RegExp("^[a-zA-Z0-9_ ]+$"),
					// 'Unique': {
					// 	'Service': u.getByUsername;
					// }
					'Required':true
				}
			}
		},

		{'model':'accessLevel.parentAccessLevel', 'id':'accessLevel_parentAccessLevel', 'conditions':{}}
	]);

	s.save_button = function() { // SAVE FUNCTION IF ADD
		validate(function(){
			nz_init_confirmMessage("Are you sure you want to save?", function(){
				var temp = s.accessLevel.parentAccessLevel;
				s.accessLevel.parentAccessLevel = s.accessLevel.parentAccessLevel._links.self.href;
				s.accessLevel.status = "Active";
				a.save(s.accessLevel, function(){
					nz_init_successMessage("Successfully Saved!", function() {
						st.go('Access Levels');
					});
				}, function(result){
					nz_init_errorMessage(result.error);
				});
				s.accessLevel.parentAccessLevel = temp;
			});
		});
	};

	s.cancel_button = function() { // CANCEL FUNCTION
		nz_init_confirmMessage("Are you sure you want to discard changes?", function() {
			st.go('Access Levels');
		});
	};

}]);
