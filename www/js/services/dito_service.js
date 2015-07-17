angular.module('service.DitoService', [])

.factory('DitoService', function(DitoRestService, $preferences){

  //var dito = $window.dito;

  return {
    identify: function(email, name, data) {
      // if (dito != undefined) {
      //   dito.identify({
      //     id: dito.generateID(email),
      //     name: name,
      //     email: email,
      //     data: {}
      //   });
      // }
      DitoRestService.signup({
        name: name,
        email: email,
        data: data
      }, function(obj) {
        reference = obj.data.reference;
        $preferences.set("reference", reference);
      });
    },

    track: function(action, data, revenue) {
      $preferences.get("reference", 
        function(reference) {
          DitoRestService.track(reference, {
            action: action, data: data, revenue: revenue
          });
        }
      );
      // if (dito != undefined) {
      //   dito.track({
      //     action: action,
      //     revenue: revenue,
      //     data: data
      //   });
      // }
    }

  };
});