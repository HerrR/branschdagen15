var app = angular.module('branschdag', ['ngRoute','ngResource']);
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl',
        activeTab: 'home'
      }).
      when('/schema',{
        templateUrl: 'partials/schedule.html',
        controller: 'ScheduleCtrl',
        activeTab: 'schedule'
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
      when('/jobb',{
        templateUrl: 'partials/jobs.html',
        controller: 'JobsCtrl',
        activeTab: 'interviews'
      }).
      when('/jobb/:jobID',{
        templateUrl: 'partials/job.html',
        controller: 'SingleJobCtrl',
        activeTab: 'interviews'
      }).
      when('/foretag/:companyName',{
        templateUrl: 'partials/company.html',
        controller: 'CompanyCtrl'
      }).
      when('/prislista/:packageType', {
        templateUrl: 'partials/package.html',
        controller: 'PackageCtrl',
        activeTab: 'prices'
      }).
      otherwise({
        redirectTo: '/'
      });
  }])