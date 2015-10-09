/*'use strict';
// controller
var phonecatControllers = angular.module('phonecatControllers',[]);

phonecatControllers.controller('phoneListCtrl',['$scope','$http',
  function($scope,$http) {
    $http.get('phones/phones.json').success(function(data) {
      $scope.phones = data;
    });

    $scope.orderPorp = 'age';
  }
]);

phonecatControllers.controller('phoneDetailCtrl',['$scope','$routeParams',
  function($scope,$routeParams) {
    $scope.phoneId = $routeParams.phoneId;
  }
]);*/

'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get('phones/phones.json').success(function(data) {
      $scope.phones = data;
    });

    $scope.orderProp = 'age';
  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.phoneId = $routeParams.phoneId;
  }]);
