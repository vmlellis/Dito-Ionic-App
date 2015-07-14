angular.module('controller.login', [])
.controller('LoginCtrl', 
  function(
    $scope,
    $ionicModal,
    utilService
  ) 
{

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
    console.log("login");
  };

  $scope.registerUser = function(form, data) {
    console.log("registerUser");
  };


})