angular.module('service.storageService', [])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])

.factory('$preferences', ['$window', function($window) { 
  return {
    get: function(key, callbackSuccess, callbackError) {
      if (ionic.Platform.isAndroid() || ionic.Platform.isIOS()) {
        var prefs = $window.plugins.appPreferences;
        prefs.fetch(callbackSuccess, callbackError, key);
      }
      else {
        callbackError();
      }
    },
    set: function(key, value) {
      if (ionic.Platform.isAndroid() || ionic.Platform.isIOS()) {
        console.log(key + " => " + value);
        var prefs = $window.plugins.appPreferences;
        prefs.store( 
          function() {
            console.log("sucesso");
          }, function(error) {
            console.log("erro");
          },
          key, value
        );
      }
    }
  }
}]);