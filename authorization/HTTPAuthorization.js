
exports.HTTPAuthorization = function HTTPAuthorization() {
   
   this.extractCredentialsFromRequestHeader = function( requestHeader ) {
      var base64EncodedCredentials = extractbase64EncodedCredentials( requestHeader );
      var decodedCredentials = decodeCredentials( base64EncodedCredentials );
      return extractCredentialsFromDecodedCredentials( decodedCredentials );
   };
   
   function extractCredentialsFromDecodedCredentials( decodedCredentials ) {
      var array = decodedCredentials.split(":");
      return { user : array[0], password : array[1] };
   }
   
   function decodeCredentials( base64EncodedCredentials ) {
      var buffer = new Buffer(base64EncodedCredentials, 'base64');
      return buffer.toString('utf8');
   }
   
   this.createAuthorizationRequestHeaderField = function( credentials ) {
      return { authorization : encodeCredentials( credentials ) };
   };
   
   function encodeCredentials( credentials ) {
      var buffer = new Buffer(credentials.user + ":" + credentials.password, 'base64');
      return buffer.toString('utf8');
   }
   
   function extractbase64EncodedCredentials( requestHeader ) {
      return requestHeader.authorization.split(" ")[1];
   }
   
};