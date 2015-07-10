angular.module('service.utilService', [])

.factory('utilService', function() {

  return {
    getTitle: function(name) {
      return "<div class='div-image'>" + 
                "<img class='bar-image' src='img/logobranco.png' height='14'>" +
              "</div>" + 
              "<span>" + name + "</span>";
    }
  };
});