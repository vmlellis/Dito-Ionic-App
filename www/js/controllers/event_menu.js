angular.module('controller.event_menu', [])
.controller('EventMenuCtrl', 
  function(
    $scope,
    utilService
  ) 
{
  $scope.exitApp = function() {
    utilService.showExitDialog();
  };
})