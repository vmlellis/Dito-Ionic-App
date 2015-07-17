angular.module('service.DitoRestService', [])

.factory('DitoRestService', function($http){

  var secret_key = "SECRET_KEY";
  var api_key = "API_KEY";

  var ditoHelper = new DitoHelper();

  var signature = ditoHelper.generateSignature(secret_key);

  var body_params = { network_name: 'pt', platform_api_key: api_key, signature: signature, encoding: "base64" };

  var USER_URL = "https://login.plataformasocial.com.br/";
  var EVENT_URL = "https://events.plataformasocial.com.br/";

  var objToParams = function(obj) {
    var str = "";
    for (var key in obj) {
      if (str != "") {
          str += "&";
      }
      str += key + "=" + encodeURIComponent(obj[key]);
    }

    if (str.length > 0) {
      str = "?" + str;
    }
    return str;
  }

  var getRequest = function(url, _params, successCallback, errorCallback) {
    $http.get(url + objToParams(body_params)).
      success(function(data, status, headers, config) {
        successCallback(data);
      }).
      error(function(data, status, headers, config) {
        errorCallback(data);
      });
  };

  var postRequest = function(url, _params, successCallback, errorCallback) {
    var config = {
      headers: {
        "Accept": "application/json;charset=utf-8",
        "Content-Type": "application/json;charset=utf-8;application/x-www-form-urlencoded",
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Headers": "X-Requested-With"
        // "Access-Control-Allow-Headers": "https://login.plataformasocial.com.br"
      }
    }

    $http.post(url, _params, config).
      success(function(data, status, headers, config) {
        successCallback(data);
      }).
      error(function(data, status, headers, config) {
        errorCallback(data);
      });
  }

  return {
    signup: function(_params, successCallback, errorCallback) {
      var id = ditoHelper.generateID(_params.email);

      var post_params = jQuery.extend({
        user_data: {
          access_token: id,
          name: _params.name,
          email: _params.email,
          data: _params.data
        }
      }, body_params);

      postRequest(USER_URL + "users/portal/" + id + "/signup", post_params,
        function(data) {
          console.log("success");
          console.log(JSON.stringify(data));
          if (successCallback)
            successCallback(data);
        },
        function(data) {
          console.log("error");
          console.log(JSON.stringify(data));
          if (errorCallback)
            errorCallback(data);
        });

    },

    getUser: function(reference, successCallback, errorCallback) {
      getRequest(USER_URL + "users/" + reference,
        function(data) {
          console.log("success");
          console.log(JSON.stringify(data));
          if (successCallback)
            successCallback(data);
        },
        function(data) {
          console.log("error");
          console.log(JSON.stringify(data));
          if (errorCallback)
            errorCallback(data);
        });

    },

    track: function(reference, _params, successCallback, errorCallback) {

      var post_params = jQuery.extend({
        event: JSON.stringify({
          "action": _params.action,
          "data": _params.data,
          "revenue": _params.revenue
        })
      }, body_params);

      console.log(post_params);

      postRequest(EVENT_URL + "users/" + reference + "/" + objToParams(body_params), post_params,
        function(data) {
          console.log("success");
          console.log(JSON.stringify(data));
          if (successCallback)
            successCallback(data);
        },
        function(data) {
          console.log("error");
          console.log(JSON.stringify(data));
          if (errorCallback)
            errorCallback(data);
        });
    }

  };
});