angular.module('directives', ['ionic'])

.directive('inputValidation', function ($compile) {
  return {
    restrict: 'E',
    scope: { 
      //data: '@data'
      value: '@value',
      name: '@name',
      form: '=form',
      model: '=model',
      inline: '=inline',
      required: '=required',
      readonly: '=readonly',
      type: '@type',
      placeholder: '@placeholder',
      validations: '@validations',
      hideValidation: '=hideValidation',
      icon: '@icon',
      inputClass: '@inputClass'
    },
    templateUrl: 'templates/shared/input-with-validation.html',
    link: function(scope, element, attrs, ngModel) {
      var input = element.find('input');
      var ctrl = input.data('$ngModelController');
      scope.ctrl = ctrl;

      var validations = scope.$eval(attrs.validations);
      var hash_validations = {};
      var array_keys = [];
      var hash_numbers = {};

      var position = 0;
      for (key in validations) {
        var _key = key;
        var _function = validations[_key].split("(")[0];

        hash_validations[_key] = _function;
        array_keys.push(_key);

        var args = validations[_key].split("(")[1];
        args = args.split(")")[0];
        args = args.split(",");
        var number = null;
        if (args && args.length > 1) {
          number = parseInt(args[1]);
        }
        hash_numbers[_key] = number;

        if (_function) {
          scope[_function] = function(value) {
            myKey = array_keys[position];
            myFunction = hash_validations[myKey];
            myNumber = hash_numbers[myKey];
            position++;

            if (position == Object.keys(validations).length) {
              position = 0;
            }

            is_valid = scope.$parent[myFunction](value, myNumber);
            if (is_valid) {
              ctrl.$setValidity(myKey, true);
              return true;
            }
            else {
              ctrl.$setValidity(myKey, false);
              return false;
            }
          };

          scope.$watch( function() {
            return scope.ctrl.$viewValue;
          }, scope[_function]);

        }
      }

    }
  };
})

.directive('dito', function() {
  return {
    restrict: 'E',
    scope: {},
    link: function(scope, iElement, iAttrs) {
      (function(d,e,id){
        window.dito={};window._ditoTemp=[];
        dito.generateID=function(str){return'_dito_sha1_'+str;}
        var m=['init','identify','alias','unalias','track'],s=d.createElement('script'),
        x=d.getElementsByTagName(e)[0];s.type='text/javascript';s.async=true;s.id=id;
        s.src='//storage.googleapis.com/dito/sdk.js';x.parentNode.insertBefore(s,x);
        for(var i=0;i<m.length;i++){dito[m[i]]=function(i){
        return function(){_ditoTemp.push({methodName:m[i],params:arguments});}}(i)}
      })(document,'script','dito-jssdk');

      dito.init({
        apiKey: 'MjAxNC0wNS0yMCAxMTowMzoyMSAtMDMwMEdyYXBoIEFwaSBWMjQ0',
        session: true
      });

      //console.log(dito);

      //scope.$watch('id', function(newId, oldId) {
      //  if (newId) {
      //    console.log(newId);
      //    ga('create', scope.id, { 'cookieDomain': 'none' });
      //  }
      //});
    }
  };
});