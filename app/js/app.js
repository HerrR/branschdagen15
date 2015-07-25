var app = angular.module('branschdag', ['ngRoute','ngResource']);
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl',
        activeTab: 'home'
      }).
      when('/massan',{
        templateUrl: 'partials/expo.html',
        controller: 'ExpoCtrl',
        activeTab: 'expo'
      }).
      when('/sittning', {
        templateUrl: 'partials/dinner.html',
        controller: 'DinnerCtrl',
        activeTab: 'dinner'
      }). 
      when('/prislista', {
        templateUrl: 'partials/prices.html',
        controller: 'PricesCtrl',
        activeTab: 'prices'
      }).
      when('/kontakt',{
        templateUrl: 'partials/contact.html',
        controller: 'ContactCtrl',
        activeTab: 'contact'
      }).
      otherwise({
        redirectTo: '/'
      });
  }])