angular.module('service.DitoService', [])

.service('DitoService', function(){

  /*(function(d, e, id) {
    var s=d.createElement('script'),
    x=d.getElementsByTagName(e)[0];
    s.type='text/javascript';s.async=true;s.id=id;
    s.src='//storage.googleapis.com/dito/sdk.js';
    x.parentNode.insertBefore(s,x);
  })(document, 'script', 'dito-jssdk');

  window.ditoAsyncInit = function(){
    dito.init('MjAxNC0wNS0yMCAxMTowMzoyMSAtMDMwMEdyYXBoIEFwaSBWMjQ0');
  }

  var executeDitoFunction = function(fn){
    var interval = window.setInterval(function(){
      if(!dito) return;

      fn.call()
      clearInterval(interval);
    }, 500);
  }

  this.identify = function(user){
    executeDitoFunction(function(){
      dito.identify(user);
    });
  }

  this.track = function(evt){
    executeDitoFunction(function(){
      dito.track(evt);
    });
  }*/
});