angular.module('controller.event_menu', [])
.controller('EventMenuCtrl', 
  function(
    $scope,
    $state,
    $preferences,
    utilService,
    DitoService
  ) 
{
  $scope.exitApp = function() {
    utilService.showExitDialog();
  };

  $scope.logout = function() {
    DitoService.track("logout", {});
    $state.go("login");
  };
})