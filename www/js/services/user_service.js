angular.module('service.userService', [])

.factory('userService', function($localstorage) {

  var users = [];

  var getUserByEmail = function(email) {
    for (var i = 0; i < users.length; i++) {
      if (users[i].email == email) {
        return users[i];
      }
    }
    return null;
  };

  return {
    update: function() {
      obj = $localstorage.getObject('ditoUsers');
      if (Object.keys(obj).length === 0)
        users = [];
      else
        users = obj;
    },
    getUser: function(email) {
      return getUserByEmail(email);
    },
    addUser: function(user) {
      console.log(user);
      u = getUserByEmail(user.email);

      if (u == null) {
        users.push(user);
      } else {
        u.name = user.name;
        u.password = user.password;
      }

      $localstorage.setObject('ditoUsers', users);
    }
  };
});