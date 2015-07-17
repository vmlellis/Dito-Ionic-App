
function DitoHelper() {
  var exponent = "10001";
  var modulus = "BB763FA45AD4A4F356AC44692DBD5AF42D6A204E79CB8BF0FFCC39DD4893C10132D791252657F3A9C4CA61AB517C92023CAFB51A63EA7474C8E232672428DD958271D988B0F43FC5F683A20C52DF580F3D09D005DA6BAE749E83DF43190DCF3F7BADD9EA91C8AA9616DB7A09CDF1ED47CB5EEC2F7638041C4FAFEBE5DBA0323B";

  var rsa = new RSAKey();
  rsa.setPublic(modulus, exponent);

  this.generateSignature = function(secret_key) {
    return hex2b64(rsa.encrypt(secret_key));
  }

  this.generateID = function(str) {
    return pidCrypt.SHA1(str);
  }
}

DitoHelper.prototype = new DitoHelper();