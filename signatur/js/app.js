var app = angular.module('rickard', ['ngRoute','ngResource']);
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home/:message', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      }).
      when('/home',{
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      }).
      otherwise({
        redirectTo: '/home/'
      });
  }])