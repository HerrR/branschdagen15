var app = angular.module('branschdag', ['ngRoute','ngResource']);
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      }).
      when('/massan',{
        templateUrl: 'partials/expo.html',
        controller: 'ExpoCtrl'
      }).
      when('/sittning', {
        templateUrl: 'partials/dinner.html',
        controller: 'DinnerCtrl'
      }). 
      when('/prislista', {
        templateUrl: 'partials/prices.html',
        controller: 'PricesCtrl'
      }).
      when('/kontakt',{
        templateUrl: 'partials/contact.html',
        controller: 'ContactCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }])