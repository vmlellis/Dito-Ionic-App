angular.module('controller.event_menu', [])
.controller('EventMenuCtrl', 
  function(
    $scope,
    $state,
    utilService
  ) 
{
  $scope.exitApp = function() {
    utilService.showExitDialog();
  };

  $scope.logout = function() {
    $state.go("login");
  };
})