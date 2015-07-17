function parseBigInt(a,b){return new BigInteger(a,b)}function linebrk(a,b){for(var c="",e=0;e+b<a.length;)c+=a.substring(e,e+b)+"\n",e+=b;return c+a.substring(e,a.length)}function byte2Hex(a){return 16>a?"0"+a.toString(16):a.toString(16)}
function pkcs1pad2(a,b){if(b<a.length+11)return alert("Message too long for RSA"),null;for(var c=[],e=a.length-1;0<=e&&0<b;){var d=a.charCodeAt(e--);128>d?c[--b]=d:127<d&&2048>d?(c[--b]=d&63|128,c[--b]=d>>6|192):(c[--b]=d&63|128,c[--b]=d>>6&63|128,c[--b]=d>>12|224)}c[--b]=0;e=new SecureRandom;for(d=[];2<b;){for(d[0]=0;0==d[0];)e.nextBytes(d);c[--b]=d[0]}c[--b]=2;c[--b]=0;return new BigInteger(c)}function RSAKey(){this.n=null;this.e=0;this.coeff=this.dmq1=this.dmp1=this.q=this.p=this.d=null}
function RSASetPublic(a,b){null!=a&&null!=b&&0<a.length&&0<b.length?(this.n=parseBigInt(a,16),this.e=parseInt(b,16)):alert("Invalid RSA public key")}function RSADoPublic(a){return a.modPowInt(this.e,this.n)}function RSAEncrypt(a){a=pkcs1pad2(a,this.n.bitLength()+7>>3);if(null==a)return null;a=this.doPublic(a);if(null==a)return null;a=a.toString(16);return 0==(a.length&1)?a:"0"+a}RSAKey.prototype.doPublic=RSADoPublic;RSAKey.prototype.setPublic=RSASetPublic;RSAKey.prototype.encrypt=RSAEncrypt;