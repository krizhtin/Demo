angular.module("coreModule", ['ui.router', 'ngResource', 'bdo.angular', 'hateoas', 'core_nz', 'bdo.login', 'isteven-multi-select', 'ui.bootstrap', 'ngFileUpload', 'ngLoadingSpinner']);

angular.module("coreModule").config(function($stateProvider, $urlRouterProvider, $httpProvider, HateoasInterfaceProvider) { // ROUTINGS
 var interceptor = function ($q, $location, bdoUser) {
    return {
      request: function (config) {

        // config.url = config.url.replace('http://192.168.1.183:8080/bdo-udts', '/udts-rp');
        // config.url = config.url.replace('http://192.168.1.124:8080/bdo-nrs-api', '/nrs-rp');
        config.url = config.url.replace('http://192.168.1.183:8080/bdo-lrs-api', '/rp');
        // config.url = config.url.replace('http://192.168.1.183:8080/bdo-nrs', '/rp');


        try{
          config.headers['Authorization'] = bdoUser.get().token_type + " " + bdoUser.get().access_token;
        }catch(err){
          window.location.replace("/");
        }

        return config;
      }
    }
  };

  $httpProvider.interceptors.push(interceptor);
  $urlRouterProvider.otherwise('/Error404');
  $stateProvider
    // ----------------------------------------------------------------------------------- User Access Control
    .state('User Accounts', { // ----------------------------- User Accounts
      url: "/User_Accounts",
      templateUrl: "js/core/view/uac/useraccounts/index.html",
      controller: 'GridUserAccountsController'
    })
    .state('View User Accounts', { // Create
      url: "/User_Accounts/View/:user_id",
      templateUrl: "js/core/view/uac/useraccounts/view.html",
      controller: null
    })
    .state('Create User Accounts', { // Create
      url: "/User_Accounts/Form",
      templateUrl: "js/core/view/uac/useraccounts/form.html",
      controller: 'FormUserAccountsController'
    })
    .state('Edit User Accounts', { // Edit
      url: "/User_Accounts/Form_Edit/:id",
      templateUrl: "js/core/view/uac/useraccounts/form.html",
      data: {user_id:null},
      controller: 'FormUserAccountsController'
    })
    .state('Access Levels', { // ----------------------------- Access Levels
      url: "/Access_Levels",
      templateUrl: "js/core/view/uac/accesslevels/index.html",
      controller: 'AccessLevelsGridController'
    })
    .state('Create Access Levels', {
      url: "/Access_Levels/Form",
      templateUrl: "js/core/view/uac/accesslevels/form.html",
      controller: 'FormAccessLevelsController'
    })
    .state('Edit Access Levels', {
      url: "/Access_Levels/Form/:id",
      templateUrl: "js/core/view/uac/accesslevels/form.html",
      data: {id:null},
      controller: 'FormAccessLevelsController'
    })
    .state('Group Profiles', { // ----------------------------- Group Profiles
      url: "/Group_Profiles",
      templateUrl: "js/core/view/uac/groupprofiles/index.html",
      controller: 'GroupProfilesGridController'
    })
    .state('Create Group Profiles', {
      url: "/Group_Profiles/form",
      templateUrl: "js/core/view/uac/groupprofiles/form.html",
      controller: 'FormGroupProfilesController'
    })
    .state('Edit Group Profiles', { 
      url: "/Group_Profiles/form",
      templateUrl: "js/core/view/uac/groupprofiles/form.html",
      controller: 'FormGroupProfilesController'
    })
    .state('Password Parameters', { // ----------------------------- Password Parameters
      url: "/Password_Parameters",
      templateUrl: "js/core/view/uac/passwordparameters/index.html",
      controller: null
    })
    .state('Monitor Users', { // ----------------------------- Monitor Users
      url: "/Monitor_Users",
      templateUrl: "js/core/view/uac/monitorusers/index.html",
      controller: 'GridMonitorUsersController'
    })
    .state('Reference Tables', { // ----------------------------- Parameter Maintenance
      url: "/Reference_Tables",
      templateUrl: "js/core/view/pm/referencetables/index.html",
      controller: 'GridReferenceTablesController'
    })
    .state('Form Parameter Maintenance', {
      url: "/Parameter_Maintenance/Form/:id",
      templateUrl: "js/core/view/pm/referencetables/form.html",
      data: {id:null},
      controller: 'FormReferenceTablesController'
    })
    .state('Error 404', { // ----------------------------- Error 404
      url: "/error404",
      templateUrl: "js/core/view/error404.html",
      controller: null
    })
    .state('logout', {
      url: '/logout',
      controller: ['bdoUser', function (bdoUser) {
        bdoUser.logout();
        window.location.href = '/bdo-nrs';
      }]
    });
    HateoasInterfaceProvider.setHttpMethods({
        update: {
            method: "PUT"
        }
    });
    HateoasInterfaceProvider.setLinksKey('_links');
});
