app.factory('Model', function () {
  var message = "Hello World!";

  this.getMessage = function(){
    return message;
  }
  
  return this;
});