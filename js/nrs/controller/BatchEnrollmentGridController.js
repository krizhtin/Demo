mainSystemModule.controller('BatchEnrollmentGridController', ['$scope', 'UserService', '$state', 'GroupService', '$rootScope', '$modal', function(s, u, st, als, rs, m) { // USER GRID

	s.batchEnrollment = {};

	s.batchEnrollment.rewardsProgramList = [
			{value: "sample1", name: "1st Sample"},
			{value: "sample2", name: "2st Sample"},
			{value: "sample3", name: "3st Sample"},
			{value: "sample4", name: "4st Sample"},
		];


}]);