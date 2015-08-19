app.factory('Model', function ($http) {
	var loadingTweets = true;
	var loadingInstagram = true;
	var tweets = [];
	var instaPosts = [];
	var socialMediaPosts = [];


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
			console.log(instaPosts);
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
  		for(partner in partners.partners){
  			if(partners.partners[partner].name == partnerName){
  				return partners.partners[partner];
  			}
  		}
  		console.log("returning false");
  		return false;
  	}

	var partners = {"partners":[
	{"name":"Spotify", "logo":"img/companyLogos/SpotifyLogo.png", "website":"https://www.spotify.com/se/", "placeInExpo":"A1", "type":"Guld", "description":"Spotify är ett svenskt multinationellt företag med en online-musiktjänst som erbjuder möjligheten att kunna lyssna till strömmad musik över Internet. Tjänsten är en av världens största i sitt slag, med sina 40 miljoner användare världen över, varav 10 miljoner är betalande abonnemangskunder (maj 2014). \n Spotify startades i april 2006 av entreprenörerna Daniel Ek och TradeDoubler-grundaren Martin Lorentzon. Koncernen har moderbolag i Luxemburg men även kontor i Stockholm, Göteborg och Borås under det svenska bolaget Spotify AB. Bolaget ska, enligt rykten, ha tagit in 15,3 miljoner euro i venturekapital från de svenska IT-teknikinvestmentbolagen Creandum och Northzone Ventures."},
	{"name":"Adlibris", "logo":"img/companyLogos/dummyLogo.png", "website":"http://bergeling.com", "placeInExpo":"A2", "type":"Silver", "description":"Lorem ipsum descriptium"},
	{"name":"Kapero", "logo":"img/companyLogos/dummyLogo.png", "website":"http://bergeling.com", "placeInExpo":"A3", "type":"Guld", "description":"Lorem ipsum descriptium"},
	{"name":"Studybuddy", "logo":"img/companyLogos/dummyLogo.png", "website":"http://bergeling.com", "placeInExpo":"A4", "type":"Silver", "description":"Lorem ipsum descriptium"},
	{"name":"Adlibris", "logo":"img/companyLogos/dummyLogo.png", "website":"http://bergeling.com", "placeInExpo":"A5", "type":"Silver", "description":"Lorem ipsum descriptium"},
	{"name":"Netlight", "logo":"img/companyLogos/dummyLogo.png", "website":"http://bergeling.com", "placeInExpo":"A6", "type":"Guld", "description":"Lorem ipsum descriptium"},
	{"name":"Studybuddy", "logo":"img/companyLogos/dummyLogo.png", "website":"http://bergeling.com", "placeInExpo":"A7", "type":"Silver", "description":"Lorem ipsum descriptium"},
	]};
	return this;
});