'use strict';

// Loyalty Rewards System
var mainSystemModule = angular.module("mainSystemModule", ['coreModule']);

mainSystemModule.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('Home', { // Home Page
      url: "",
      templateUrl: "js/nrs/view/home.html",
      controller: function(){}
    })
    //-------------------------------------------- System Configuration
    .state('Bank Calendar', { // Bank Calendar
      url: "/bankcalendar",
      templateUrl: "js/nrs/view/systemconfiguration/bankcalendar/index.html",
      controller: null
    })
    .state('Menu Management', { // Menu Management
      url: "/menumanagement",
      templateUrl: "js/nrs/view/systemconfiguration/menumanagement/index.html",
      controller: null
    })
    .state('Audit Trail', { // Audit Trail
      url: "/audittrail",
      templateUrl: "js/nrs/view/systemconfiguration/audittrail/index.html",
      controller: null
    })
    .state('Housekeeping Purging', { // Housekeeping Purging
      url: "/housekeepingpurging",
      templateUrl: "js/nrs/view/systemconfiguration/housekeepingpurging/index.html",
      controller: null
    })
    .state('Backup Recovery', { // Backup Recovery
      url: "/backuprecovery",
      templateUrl: "js/nrs/view/systemconfiguration/backuprecovery/index.html",
      controller: null
    })
    .state('System Parameters', { // System Parameters
      url: "/systemparameters",
      templateUrl: "js/nrs/view/systemconfiguration/systemparameters/index.html",
      controller: null
    })
    .state('System Messages', { // System Messages
      url: "/systemmessage",
      templateUrl: "js/nrs/view/systemconfiguration/systemmessages/index.html",
      controller: null
    })
    .state('Rewards Configuration', { // Rewards Configuration
      url: "/rewardsprogram/configuration",
      templateUrl: "js/nrs/view/systemconfiguration/rewardsconfiguration/index.html",
      controller: 'GridRewardsConfigurationController'
    })
    //-------------------------------------------- Rewards Program
    .state('Rewards Program', { // Rewards Program
      url: "/rewardsprogram",
      templateUrl: "js/nrs/view/rewardsprogram/index.html",
      controller: 'GridRewardsProgramController'
    })
    .state('Create Rewards Program', { // Create Rewards Program
      url: "/rewardsprogram/create",
      templateUrl: "js/nrs/view/rewardsprogram/form.html",
      controller: 'FormRewardsProgramController'
    })
    //-------------------------------------------- Enrollment
    .state('Individual Enrollment', { // Individual Enrollment
      url: "/enrollment/individual",
      templateUrl: "js/nrs/view/enrollment/individual/index.html",
      controller: 'IndividualEnrollmentGridController'
    })
    .state('Batch Enrollment', { // Batch Enrollment
      url: "/enrollment/batch",
      templateUrl: "js/nrs/view/enrollment/batch/index.html",
      controller: null
    })
    //-------------------------------------------- Batch Process
    .state('batch-scheduler', { // Batch Scheduler
      url: "/batch-scheduler",
      templateUrl: "js/nrs/view/batchprocess/batchscheduler/index.html",
      controller: 'BatchSchedulerShowController'
    })
    .state('batch-scheduler.new', { // Create Batch Scheduler
      url: "/new",
      templateUrl: "js/nrs/view/batchprocess/batchscheduler/createnew.html",
      controller: 'BatchSchedulerNewController'
    })
    .state('batch-scheduler.edit', {
        url: '/edit/:id',
        templateUrl: 'js/nrs/view/batchprocess/batchscheduler/edit.html',
        controller: 'BatchSchedulerEditController'
    })
    .state('batch-scheduler.view', {
        url: '/details/:id',
        templateUrl: 'js/nrs/view/batchprocess/batchscheduler/details.html',
        controller: 'BatchSchedulerDetailsController'
    })  
    .state('Process Monitor', { // Process Monitor
      url: "/batch/monitor",
      templateUrl: "js/nrs/view/batchprocess/processmonitor/index.html",
      controller: null
    })
    .state('Process History', { // Process History
      url: "/batch/history",
      templateUrl: "js/nrs/view/batchprocess/processhistory/index.html",
      controller: null
    })
    .state('View Process History', { // Process History
      url: "/batch/history/view",
      templateUrl: "js/nrs/view/batchprocess/processhistory/view.html",
      controller: null
    })
    //-------------------------------------------- Redemptions
        .state('Batch Redemption', { // Batch Redemption
      url: "/batch",
      templateUrl: "js/nrs/view/redemptions/batch/index.html",
      controller: null
    })
    .state('Redeem Coupons', { // Coupons
      url: "/coupon",
      templateUrl: "js/nrs/view/redemptions/coupons/index.html",
      controller: 'GridCouponsController'
    })
    .state('Redeem Vouchers', { // Vouchers
      url: "/voucher",
      templateUrl: "js/nrs/view/redemptions/vouchers/index.html",
      controller: 'GridVouchersController'
    })
    //-------------------------------------------- Points Management
    .state('Points Management', { // Points Management
      url: "/points",
      templateUrl: "js/nrs/view/redemptions/pointsmanagement/index.html",
      controller: "GridPointsManagementController"
    })
    .state('Select Account Number', { // Modify Points
      url: "/points/Form/:card_num",
      templateUrl: "js/nrs/view/redemptions/pointsmanagement/form.html",
      controller: 'FormPointsManagementController'
    })
    //-------------------------------------------- Manual Redemption
    .state('Manual Redemption', { // Manual Redemption
      url: "/manual",
      templateUrl: "js/nrs/view/redemptions/manual/index.html",
      controller: "GridManualRedemptionController"
    })
    .state('Select Card Number', { // Create
      url: "/manual/Form/:card_num",
      templateUrl: "js/nrs/view/redemptions/manual/form.html",
      controller: 'FormManualRedemptionController'
    })
    //-------------------------------------------- Catalogue Item
    .state('Catalogue Items', { // Catalogue Items
      url: "/catalogitems",
      templateUrl: "js/nrs/view/redemptions/catalogueitems/index.html",
      controller: 'GridCatalogueItemController'
    })
    .state('Edit Catlogue Item', { // Create
      url: "/catalogitems/Form/:item_id",
      templateUrl: "js/nrs/view/redemptions/catalogueitems/form.html",
      controller: 'FormCatalogueItemController'
    })
    .state('Create Catlogue Item', { // Create
      url: "/catalogitems/Form",
      templateUrl: "js/nrs/view/redemptions/catalogueitems/form.html",
      controller: 'FormCatalogueItemController'
    })
    //-------------------------------------------- Raffle
    .state('Raffle Entries', { // Raffle Entries
      url: "/raffle/entry",
      templateUrl: "js/nrs/view/redemptions/raffles/entries/index.html",
      controller: 'GridRaffleEntriesController'
    })
    .state('Raffle Prizes', { // Raffle Prizes
      url: "/raffle/prize",
      templateUrl: "js/nrs/view/redemptions/raffles/prizes/index.html",
      controller: 'GridRafflePrizeController'
    })
    .state('Raffle Prizes Form', { // Raffle Prizes
      url: "/raffle/prize/form",
      templateUrl: "js/nrs/view/redemptions/raffles/prizes/form.html",
      controller: null //'FormRafflePrizeController'
    })
    //-------------------------------------------- Redemptions List
    .state('Redemption List', { // Redemption List
      url: "/redeemed_item",
      templateUrl: "js/nrs/view/redemptions/redemptionlist/index.html",
      controller: 'GridRedemptionListController'
    })
    .state('Create Redemption List', { // Create
      url: "/manual",
      templateUrl: "js/nrs/view/redemptions/manual/index.html",
      controller: "GridManualRedemptionController"
    })
    .state('View Redemption Request', { // View
      url: "/redeemed_item/view/:redemption_request_id",
      templateUrl: "js/nrs/view/redemptions/redemptionlist/form.html",
      controller: 'FormRedemptionListController'
    })
    //-------------------------------------------- Raffle Roulette
    .state('Roulette', { // Raffle Roulette
      url: "/roulette",
      templateUrl: "js/nrs/view/raffleroulette/index.html",
      controller: 'GridRaffleRouletteController'
    })
    //-------------------------------------------- Inquiry and Reports
    .state('Card Inquiry', { // Card Inquiry
      url: "/inquiry",
      templateUrl: "js/nrs/view/inquiryandreports/cardinquiry/index.html",
      controller: null
    })
    .state('Dynamic Reports', { // Dynamic Reports
      url: "/reports/dynamic",
      templateUrl: "js/nrs/view/inquiryandreports/dynamicreports/index.html",
      controller: null
    })
    .state('Standard Reports', { // Standard Reports
      url: "/reports/standard",
      templateUrl: "js/nrs/view/inquiryandreports/standardreports/index.html",
      controller: null
    })
});
