angular.module('controller.cards', [])
.controller('CardsCtrl', 
  function(
    $scope, 
    TDCardDelegate,
    utilService,
    cardService,
    $timeout
  ) 
{
  $scope.viewtitle = utilService.getTitle("Cards");

  $scope.cards = [];
  $scope.cards.push(cardService.getFirstCard());

  $scope.showAccepted = false;
  $scope.showDeclined = false;

  var canChangeLeft = true;
  var canChangeRight = true;

  $scope.cardPartialSwipe = function(card, amt) {
    //console.log(amt);
    if (canChangeLeft && amt > 0) {
      $scope.showAccepted = true;
      $scope.showDeclined = false;
      canChangeLeft = false;
      canChangeRight = true;
    }

    if (canChangeRight && amt < 0) {
      $scope.showAccepted = false;
      $scope.showDeclined = true;
      canChangeLeft = true;
      canChangeRight = false;
    }
  }

  $scope.cardSnapBack = function(card) {
    console.log("snapBack");
    $timeout( function() { 
      $scope.showAccepted = false;
      $scope.showDeclined = false;
      canChangeLeft = true;
      canChangeRight = true;
    });
  }

  var addNextCard = function() {
    canChangeLeft = true;
    canChangeRight = true;

    $scope.showAccepted = false;
    $scope.showDeclined = false;
    
    $timeout( function(){ 
      var newCard = cardService.getNextCard();

      $scope.cards.splice(0,$scope.cards.length);
      $scope.cards.push(angular.extend({}, newCard));
    });
  }

  $scope.cardDestroyed = function(card) {
    addNextCard();
  };

  $scope.cardTransitionLeft = function(card) {
    console.log('LEFT TRANSITION');
    //console.log(card);
  }

  $scope.cardTransitionRight = function(card) {
    console.log('RIGHT TRANSITION');
    //console.log(card);
  }

  $scope.accept = function(card) {
    console.log('ACCEPT');
    $scope.showAccepted = true;
    $scope.showDeclined = false;
    $timeout( function(){ 
      $scope.cardDestroyed(card);
    }, 200);
    
    //console.log(card);
  }

  $scope.decline = function(card) {
    console.log('DECLINE');
    $scope.showAccepted = false;
    $scope.showDeclined = true;
    $timeout( function(){ 
      $scope.cardDestroyed(card);
    }, 200);
    //console.log(card);
  }

})