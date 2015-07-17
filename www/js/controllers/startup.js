angular.module('controller.startup', [])
.controller('StartupCtrl', function(
  $scope,
  $state,
  $timeout,
  $preferences,
  utilService,
  userService
) {

  $timeout( function() { 
    
    $preferences.get("email", function (email) {
      if (email != "") {
        var u = userService.getUser(email);
        if (u != null) {
          utilService.showNativeToast("Logado com sucesso!");
          DitoService.identify(u.email, u.name, {});
          DitoService.track("login", {});
          $state.go("eventmenu.cards", { email: email });
        }
        else {
          $state.go("login");
        }
      }
      else {
        $state.go("login");
      }
    }, function() {
      $state.go("login");
    })
    
  }, 3000);

})