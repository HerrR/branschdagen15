app.factory('Model', function ($http) {
	var loadingTweets = true;
	var tweets;

	$http.get("php/getTweets.php")
	.success(
		function(data) {
			loadingTweets = false;
			tweets = data.statuses;
			console.log(tweets);
		}
	);

  	this.loadingTweets = function(){
  		return loadingTweets;
  	}

  	this.getTweets = function(){
  		return tweets;
  	}

	return this;
});