mainSystemModule.controller('FormRewardsProgramController', ['$scope', 'RewardsProgramService', '$state', '$rootScope',
                                                             'BankService', 'PointsComputationService', 'BonusComputationService',
                                                             'RedemptionRequirementService', 'PointsCreditingService', 'PointsExpiryService',
                                                             'ChargeFeeInformationService', 'PushNotificationService',
                                                    function(s, rps, st, als, rs, 
                                                    		 bnkS, ptsCmptnS, bnsCmptnS, 
                                                    		 rdmptnReqsS, ptsCrdtS, ptsExpS, 
                                                    		 chargeFeeInfoS, pushNotifS) { // Rewards progrom form

	s.activeTab = 'pointsComputation';

	s.setActive = function (activeTab) {
		s.activeTab = activeTab;
	};

	s.create = function () {
		console.log('active:', s.activeTab);
		s.$broadcast(s.activeTab);
	};
}]);
