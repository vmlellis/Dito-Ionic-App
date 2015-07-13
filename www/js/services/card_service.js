angular.module('service.cardService', [])

.factory('cardService', function() {
  var cards = [
    { title: 'Você é fera?', image: 'img/cards/fera.jpg' },
    { title: 'Você é vendedor?', image: 'img/cards/vendedor.jpg' },
    { title: 'Você quer subir de carreira?', image: 'img/cards/subir_metas.jpg' },
    { title: 'Curte programar?', image: 'img/cards/programacao.jpeg' },
    { title: 'Gosta de desafios?', image: 'img/cards/calculo.jpg' },
    { title: 'É criativo?', image: 'img/cards/inovacao.jpg' }
  ];

  for (index = 0; index < cards.length; index++) {
    element = cards[index];
    element.id = index+1;
  }

  var index = -1;

  return {
    getFirstCard: function() {
      index = 0;
      return cards[0];
    },
    getNextCard: function() {
      index++;
      if (index >= cards.length)
        index = 0;

      return cards[index];
    },
    getRandomCard: function() {
      return cards[Math.floor(Math.random() * cards.length)];
    }
  };
});