// ============ Declare Application =========== //
var app = angular.module('boxy', ['ngRoute']);

// ============ Route Providers =============== //
app.config(function ($routeProvider) {

    $routeProvider.when('/', {
            controller: 'MainController',
            templateUrl: './ng/views/main.html'
        })
        .when('/about', {
            // controller: 'loginController',
            templateUrl: './ng/views/about.html'
        })
        .when('/contact', {
            // controller: 'loginController',
            templateUrl: './ng/views/contact.html'
        })
        .when('/organization', {
            controller: 'OrganizationsController',
            templateUrl: './ng/views/organization.html'
        })

    /* =====================System Function Routing ============================= */

});

// ============ Controllers =================== //
// ===== Login ===== //
app.controller('loginController', ['$scope', '$location', 'authService', 'growl', function ($scope, $location, authService, growl) {
    $scope.loginData = {
        email: "",
        password: ""
    };
    $scope.message = "";
    $scope.login = function () {
        authService.login($scope.loginData).then(function (response) {
            growl.success("You have been logged in!");
            $location.path('/');
        },
        function (err) {
            $scope.message = err.error_description;
            growl.error("You have enterd a bad username or password.", {
                title: 'Login Failure!'
            });
        });
    };
}]);

// ======= Dash Schedule Controller ======= //
app.controller('MainController', function($scope, OrganizationFactory) {
  $scope.organizations = [];
  OrganizationFactory.getOrganizations().success(function (data) {
    $scope.serviceBase = 'http://192.168.100.15:3000/';
    console.log(data.result);
    if(!data.err)
      $scope.organizations = data.result;
  });
});

app.controller('OrganizationsController', function($scope, OrganizationFactory, CommonFactory ) {
  $scope.catagory = CommonFactory.catagory;
  $scope.organizations = [];
  OrganizationFactory.getOrganizations().success(function (data) {
    $scope.serviceBase = 'http://192.168.100.15:3000/';
    console.log(data.result);
    if(!data.err)
      $scope.organizations = data.result;
  });
  $scope.logout = function () {
    console.log('logout');
    authService.logOut();
  }
});
app.filter("commaBreak",function () {
    return function ( value ) {
        if( !value.length ) return;
        return value.split('');
    }
});
// ============ Factories ===================== //
  // Organization
  app.factory('OrganizationFactory', function ($http) {
      var factory = {};
      var categorySearch = '';
      //var serviceBase = 'http://127.0.0.1:3000/';
      var serviceBase = 'http://192.168.100.15:3000/';
      factory.getOrganizations = function () {
          return $http.get(serviceBase + 'Organization');
      };
      factory.getOrganization = function (usr_id) {
          console.log(usr_id);
          return $http.get(serviceBase + 'Organization/' + usr_id);
      };
      return factory;
  });
  // Organization
    // Common
    app.factory('CommonFactory', function () {
      var common = {
        catagory : {
          'H' : 'Hospital',
          'E' : 'Education',
          'D' : 'Disaster Relief',
          'C' : 'Children',
          'R' : 'Disaster Relief'
        }
      }
      return common;
    });
    // Common

/**
app.factory('UserFactory', function ($http) {
    var factory = {};
    factory.getUsers = function () {
        return $http.get('./ng/api/userquery.php');
    };
    return factory;
}); **/
