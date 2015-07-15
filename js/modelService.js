app.factory('Model', function () {
  	var message = "Main Content goes here";



	this.getMessage = function(){
		return message;
	}
  
	return this;
});