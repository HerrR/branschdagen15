app.factory('Model', function ($http) {
	var loadingTweets = true;
	var loadingInstagram = true;
	var tweets;
	var instaPosts;
	var socialMediaPosts = [];

	$http.get("php/getTweets.php")
	.success(
		function(data) {
			loadingTweets = false;
			tweets = data.statuses;
			// console.log(tweets);
			for(tweet in tweets){
				var tweetEssentials = {};
				var currentTweet = tweets[tweet];
				tweetEssentials.type = "tweet";
				// tweetEssentials.created_at = currentTweet.created_at;
				tweetEssentials.created = new Date(currentTweet.created_at);
				// console.log("Tweet created at: "); 
				// console.log(tweetEssentials.created_at);
				tweetEssentials.name = currentTweet.user.name;
				tweetEssentials.profilePic = currentTweet.user.profile_image_url;
				tweetEssentials.text = currentTweet.text;
				tweetEssentials.picture = null;
				socialMediaPosts.push(tweetEssentials);
			}
		}
	);

	$http.get("php/getInstagram.php")
	.success(
		function(data){
			loadingInstagram = false;
			instaPosts = data.data;
			for(post in instaPosts){
				var instaEssentials = {};
				var currentPost = instaPosts[post];
				instaEssentials.type = "instagram";
				// instaEssentials.created_at = currentPost.created_time;
				instaEssentials.created = new Date(currentPost.created_time * 1000);
				// console.log("instagram created at: ");
				// console.log(instaEssentials.created_at);
				instaEssentials.name = currentPost.user.full_name;
				instaEssentials.profilePic = currentPost.user.profile_picture;
				instaEssentials.text = currentPost.caption.text;
				instaEssentials.picture = currentPost.images.standard_resolution.url;
				socialMediaPosts.push(instaEssentials);
			}
		})

	this.loadingInstagram = function(){
		return loadingInstagram;
	}

  	this.loadingTweets = function(){
  		return loadingTweets;
  	}

  	this.getInstagrams = function(){
  		return instaPosts;
  	}

  	this.getTweets = function(){
  		return tweets;
  	}

  	this.loadingSocialMedia = function(){
  		return loadingTweets && loadingInstagram;
  	}

  	this.getSocialMedia = function(){
  		return socialMediaPosts;
  	}


	return this;
});