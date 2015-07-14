angular.module('controller.startup', [])
.controller('StartupCtrl', function(
  $scope,
  $state,
  $timeout
) {

  var goToLogin = function() {
    $state.go("login");
  }

  $timeout( function() { 
    goToLogin();
  }, 3000);

})