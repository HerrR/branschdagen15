app.factory('Model', function ($http) {
	var loadingTweets = true;
	var loadingInstagram = true;
	var sendingEmail = false;
	var emailSent = false;
	var tweets = [];
	var instaPosts = [];
	var socialMediaPosts = [];
	var branschdagsgruppen;
	var partners;
	var events;


	$http.get("php/getTweets.php")
	.success(
		function(data) {
			// If searching for one or multiple hashtags or users, tweets = data.statuses. Otherwise tweets = data.
			tweets = data;
			for(tweet in tweets){
				var tweetEssentials = {};
				var currentTweet = tweets[tweet];
				tweetEssentials.type = "tweet";
				tweetEssentials.created = new Date(currentTweet.created_at);
				tweetEssentials.name = currentTweet.user.name;
				tweetEssentials.profilePic = currentTweet.user.profile_image_url;
				tweetEssentials.text = currentTweet.text;
				tweetEssentials.picture = null;
				tweetEssentials.profileURL = "https://twitter.com/"+currentTweet.user.screen_name;
				socialMediaPosts.push(tweetEssentials);
			}
			loadingTweets = false;
		}
	);

	$http.get("php/getInstagram.php")
	.success(
		function(data){
			instaPosts = data.data;
			for(post in instaPosts){
				var instaEssentials = {};
				var currentPost = instaPosts[post];
				instaEssentials.type = "instagram";
				instaEssentials.created = new Date(currentPost.created_time * 1000);
				instaEssentials.name = currentPost.user.full_name;
				instaEssentials.profilePic = currentPost.user.profile_picture;
				instaEssentials.text = currentPost.caption.text;
				instaEssentials.picture = currentPost.images.standard_resolution.url;
				instaEssentials.profileURL = "https://instagram.com/"+currentPost.user.username;
				socialMediaPosts.push(instaEssentials);
			}
			loadingInstagram = false;
		})

	$http.get("php/getTeam.php")
	.success(
		function(data){
			branschdagsgruppen = data;
		});

	$http.get("php/getPartners.php")
	.success(
		function(data){
			partners = data;
		});

	this.getEvents = function(){
	    $http.get("php/getEvents.php").success(function(data){
	    	for(i in data){
	    		data[i].start = new Date(data[i].start);
	    		if(data[i].end != null){
	    			data[i].end = new Date(data[i].end);
	    		}
	    	}
	      	events = data;
	    })
	}

	this.getSchedule = function(){
		return events;
	}

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

  	this.getPartners = function(){
  		return partners;
  	}

  	this.getPartner = function(partnerName){
  		for(partner in partners){
  			if(partners[partner].name == partnerName){
  				return partners[partner];
  			}
  		}
  		return false;
  	}

  	this.getBDgruppen = function(){
  		return branschdagsgruppen;
  	}

  	this.contactMe = function(contactInfo){
  		sendingEmail = true;
  		// console.log(contactInfo);
  		console.log("Sending email...");

	    var req = {
	      	url: "php/contactMe.php",
	      	method: "GET",
	      	params: {contactInfo:contactInfo}
	    }

	    $http(req).success(function(data){
	    	console.log("Email sent successfully!");
	    	sendingEmail = false;
	    	emailSent = true;
	    })
  	}

  	this.sendingEmail = function(){
  		return sendingEmail;
  	}

  	this.emailSent = function(){
  		return emailSent;
  	}

	return this;
});