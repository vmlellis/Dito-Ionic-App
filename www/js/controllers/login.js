angular.module('controller.login', [])
.controller('LoginCtrl', 
  function(
    $scope,
    $ionicModal,
    $state,
    $preferences,
    utilService,
    userService,
    DitoService,
    DitoRestService
  ) 
{

  // DitoRestService.getUser("t1@t1", 
  //   function(data) {
  //     console.log(data);
  //   }
  // );

  // DitoRestService.signup({
  //   name: "T1",
  //   email: "t1@t1",
  //   data: {}
  // }, function(obj) {
  //   console.log("ok");
  //   if (obj.data) {
  //     console.log(obj.data.reference);

  //     reference = obj.data.reference;
  //     DitoRestService.track(reference, {
  //       action: "teste-ionic2", data: {}
  //     });
  //   }
  // });

    // DitoRestService.track("234242423", {
    //   action: "teste", data: {}
    // });

  //DitoRestService.track("t1@t1", "teste", {});


  userService.update();

  $scope.data = {};
  $scope.user = {};

  $scope.viewtitle = utilService.getTitle("Login");
  $scope.register_viewtitle = utilService.getTitle("Cadastrar Usuário");

  $scope.inputs = [
    {
      value: "E-mail", 
      name: "email", 
      required: "true",
      type: "text",
      placeholder: "Digite o e-mail",
      icon: "icon ion-email placeholder-icon"
    },
    {
      value: "Senha", 
      name: "password", 
      required: "true",
      type: "password",
      placeholder: "Digite a senha",
      icon: "icon ion-lock-combination placeholder-icon"
    }
  ];

  var createRegisterUserModal = function() {
    $ionicModal.fromTemplateUrl('templates/login/_new.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.registerUserModal = modal;
    });
  };

  $scope.cancelRegisterUserModal = function() {
    $scope.registerUserModal.remove();
    createRegisterUserModal();
  };

  createRegisterUserModal();

  $scope.openRegisterUserModal = function() {
    $scope.registerUserModal.show();
    $scope.user = {};
  };

  $scope.login = function(form, data) {

    email = data.email;
    password = data.password;

    user = userService.getUser(email);

    if (user == null) {
      console.log("usuario nao existe");
      utilService.showNativeToast("Usuário não existe!");
      return;
    }

    if (user.password != password) {
      console.log("senha incorreta");
      utilService.showNativeToast("Senha incorreta!");
      return;
    }
    
    DitoService.identify(email, name, {});
    DitoService.track("login", {});

    $preferences.set("email", email);
    utilService.showNativeToast("Logado com sucesso!");
    $state.go("eventmenu.cards", { email: email });
    
  };

  $scope.registerUser = function(form, data) {
    console.log(data);
    newUser = { email: data._email, name: data._name, password: data._password };
    
    DitoService.identify(newUser.email, newUser.name, {});

    userService.addUser(newUser);
    utilService.showNativeToast("Registrado com sucesso!");
    $scope.cancelRegisterUserModal();
  };


})