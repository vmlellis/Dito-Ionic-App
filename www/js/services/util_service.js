angular.module('service.utilService', [])

.factory('utilService', function(
  $ionicPopup,
  $ionicPlatform, 
  $cordovaToast
) {

  var confirmDialog = function(title, confirmCallback) {
    var confirmPopup = $ionicPopup.confirm({
      title: title,
      template: '',
      buttons: [{
        text: 'Não',
        type: 'button-default'
      }, {
        text: 'Sim',
        type: 'button-balanced',
        onTap: function(e) {
          return true;
        }
      }]
    });

    confirmPopup.then(function(res) {
      if(res) {
        confirmCallback();
      }
    });
  }

  return {
    getTitle: function(name) {
      return "<div class='div-image'>" + 
                "<img class='bar-image' src='img/logobranco.png' height='14'>" +
              "</div>" + 
              "<span>" + name + "</span>";
    },
    showConfirmDialog: function(title, confirmCallback) {
      confirmDialog(title, confirmCallback);
    },

    showExitDialog: function() {
      var confirmCallback = function() {
        ionic.Platform.exitApp();
      }

      confirmDialog('Deseja sair da aplicação?', confirmCallback);

    },

    showNativeToast: function(msg) {
      if (ionic.Platform.isAndroid() || ionic.Platform.isIOS()) {
        $ionicPlatform.ready(function() {
          $cordovaToast.show(msg, 'long', 'bottom');
        });
      }
    }
  };
});