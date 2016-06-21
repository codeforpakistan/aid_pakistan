/**
* @Author: Muhammad Ali Anjum <ali>
* @Date:   15-Jun-2016 09:25 pm
* @Last modified by:   ali
* @Last modified time: 19-Jun-2016 03:50 pm
*/

// ============ Declare Application =========== //
var app = angular.module('aidpakistan', ['ngRoute']);

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
        .when('/organisation', {
            controller: 'OrganisationsController',
            templateUrl: './ng/views/organisations.html'
        })
        .when('/organisation/:id', {
            controller: 'OrganisationController',
            templateUrl: './ng/views/organisation.html'
        })

    /* =====================System Function Routing ============================= */

});

// ============ Controllers =================== //
// ===== Login ===== //
app.controller('loginController', ['$scope', '$location', function ($scope, $location) {
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
app.controller('MainController', function($scope, OrganisationFactory) {
  $scope.organisations = [];
  $scope.getOrganisations = function (cat,name){
    OrganisationFactory.getOrganisations(cat,name).success(function (data) {
      $scope.serviceBase = OrganisationFactory.serviceBase;
      console.log(data.result);
      if(!data.err)
        $scope.organisations = data.result;
    });
  }
  $scope.getOrganisations('','');
  $scope.select_catagory = function (key){
    $scope.getOrganisations(key,'');
  }
});

app.controller('OrganisationsController', function($scope, OrganisationFactory, CommonFactory ) {
  console.log('OrganisationsController');
  $scope.catagory = CommonFactory.catagory;
  $scope.organisations = [];
  $scope.serviceBase = OrganisationFactory.serviceBase;
  $scope.selection = '';
  $scope.name = '';
  $scope.getOrganisations = function (cat,name){
    OrganisationFactory.getOrganisations(cat,name).success(function (data) {
      console.log(data.result);
      if(!data.err)
        $scope.organisations = data.result;
    });
  }
  $scope.search = function () {
    console.log($scope.selection + " : " + $scope.name);
    $scope.getOrganisations($scope.selection,$scope.name);
  }
  // toggle selection categories
  $scope.toggleSelection = function (cat) {
    var idx = $scope.selection.indexOf(cat);
    if (idx > -1) {
      $scope.selection = $scope.selection.replace(cat,'');
    }
    else {
      $scope.selection += cat;
    }
    console.log($scope.selection + " : " + $scope.name);
    this.getOrganisations($scope.selection,$scope.name);
  };
  $scope.getOrganisations('','');
});
app.controller('OrganisationController', function($scope, $routeParams, OrganisationFactory, CommonFactory ) {
  console.log('OrganisationController');
  $scope.catagory = CommonFactory.catagory;
  $scope.serviceBase = OrganisationFactory.serviceBase;
  $scope.organisation = {};
  var id = $routeParams.id;
  console.log(id);
  OrganisationFactory.getOrganisation(id).success(function (data) {
    console.log(data.result);
    if(!data.err)
      $scope.organisation = data.result;
  });
  OrganisationFactory.getOrganisations('','').success(function (data) {
    console.log(data.result);
    if(!data.err)
      $scope.organisations = data.result;
  });
});

app.filter("commaBreak",function () {
    return function ( value ) {
        if( !value.length ) return;
        return value.split('');
    }
});
// ============ Factories ===================== //
  // Organisation
  app.factory('OrganisationFactory', function ($http) {
      var factory = {};
      var categorySearch = '';
      //var serviceBase = 'http://127.0.0.1:3000/';
      factory.serviceBase = 'http://localhost:3000/';
      factory.getOrganisations = function (cat,name) {
        var query_param = "";
          if(cat != undefined && cat != ''){
            query_param += "categories=" + cat;
          }
          if(name != '' && name != undefined){
            query_param += (query_param == "") ? "name=" + name : "&name=" + name;
          }
          return $http.get(factory.serviceBase + 'organization?' + query_param);
      };
      factory.getOrganisation = function (org_id) {
          return $http.get(factory.serviceBase + 'organization/' + org_id);
      };
      return factory;
  });
  // Organisation
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
