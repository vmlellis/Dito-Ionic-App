// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('ditoIonicApp', [
  'ionic', 
  'ngCordova',
  'ngAnimate',
  'ngMessages',
  'ionic.contrib.ui.tinderCards',
  'toastr',
  'directives',
  'controllers', 
  'services'
])

.constant('settings', {
  appName: "Dito Ionic",
  appVersion: "0.0.1"
})

.run(function($ionicPlatform, $state, utilService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });

  $ionicPlatform.registerBackButtonAction(function(e){
    e.preventDefault();
    utilService.showExitDialog();
    return false;
  }, 101);
})

.config(function(
  $stateProvider, 
  $urlRouterProvider, 
  $ionicConfigProvider, 
  $httpProvider, 
  toastrConfig
) {

  $httpProvider.defaults.useXDomain = true;
  //$httpProvider.defaults.withCredentials = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $httpProvider.defaults.headers.common["Accept"] = "application/json;application/x-www-form-urlencoded;charset=utf-8";
  $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
  // $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = 'Accept;Content-Type';



  $ionicConfigProvider.navBar.alignTitle('left');
  $ionicConfigProvider.views.maxCache(0);
  $ionicConfigProvider.views.swipeBackEnabled(false);

  angular.extend(toastrConfig, { positionClass: 'toast-bottom-center' });

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/startup');

  $stateProvider

  .state('startup', {
    url: '/startup',
    cache: false,
    templateUrl: 'templates/startup/index.html',
    controller: 'StartupCtrl'
  })

  .state('login', {
    url: '/login',
    params: { email: null },
    cache: false,
    templateUrl: 'templates/login/index.html',
    controller: 'LoginCtrl'
  })

  .state('eventmenu', {
    url: "/event",
    abstract: true,
    templateUrl: "templates/event_menu/menu.html",
    controller: 'EventMenuCtrl'
  })

  .state('eventmenu.cards', {
    url: '/cards',
    cache: false,
    params: { email: null, reference: null },
    views: {
      'menuContent': {
        templateUrl: "templates/cards/index.html",
        controller: 'CardsCtrl'
      }
    }
  });
  

});
