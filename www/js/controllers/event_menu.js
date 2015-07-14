angular.module('controller.event_menu', [])
.controller('EventMenuCtrl', 
  function(
    $scope,
    $state,
    $preferences,
    utilService
  ) 
{
  $scope.exitApp = function() {
    $preferences.set("email", "");
    utilService.showExitDialog();
  };

  $scope.logout = function() {
    $state.go("login");
  };
})