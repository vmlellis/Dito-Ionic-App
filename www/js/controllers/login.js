angular.module('controller.login', [])
.controller('LoginCtrl', 
  function(
    $scope,
    $ionicModal,
    $state,
    $preferences,
    utilService,
    userService,
    DitoService
  ) 
{


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
    
    $window.dito.identify({
      id: dito.Helpers.sha1(user.email),
      name: user.name,
      email:user.email,
    });

    $window.dito.track({
      action: 'logou',
      data: { }
    });

    $preferences.set("email", email);
    utilService.showNativeToast("Logado com sucesso!");
    $state.go("eventmenu.cards", { email: email });
    
  };

  $scope.registerUser = function(form, data) {
    newUser = { email: data.email, name: data.name, password: data.password };
    userService.addUser(newUser);
    $scope.cancelRegisterUserModal();
  };


})