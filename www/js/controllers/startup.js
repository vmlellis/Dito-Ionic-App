angular.module('controller.startup', [])
.controller('StartupCtrl', function(
  $scope,
  $state,
  $timeout,
  $preferences,
  utilService
) {

  $timeout( function() { 
    
    $preferences.get("email", function (email) {
      if (email != "" && utilService.getUser(email) != null) {
        utilService.showNativeToast("Logado com sucesso!");
        $state.go("eventmenu.cards", { email: email });
      }
      else {
        $state.go("login");
      }
    }, function() {
      $state.go("login");
    })
    
  }, 3000);

})