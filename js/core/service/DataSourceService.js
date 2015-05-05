angular.module("mainSystemModule").factory('DataSource', ['$http', function(h) { // DATASOURCE SERVER INFORMATION
  
  // var serverDataSource = "http://192.168.1.54:8080/bdo-fx/api"; // URL
  // var serverDataSource = "/udts-rp/api"; // URL
  // var serverDataSource = "http://192.168.1.183:8080/bdo-nrs-api/api"; // URL
  // var serverDataSource = "/nrs-rp/api"; // URL
  // var serverDataSource = "/rp/api"; // URL
  var serverDataSource = "/rp/api"; // URL


  this.getSourceUrl = function() { return serverDataSource; } // Return serverDataSource

  return this;
}]);
