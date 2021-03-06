app.factory('Model', function ($http) {
	var loadingTweets = true;
	var loadingInstagram = true;
	var sendingEmail = false;
	var loadingPartners = true;
	var emailSent = false;
	var loadingJobs = true;
	var tweets = [];
	var instaPosts = [];
	var socialMediaPosts = [];
	var branschdagsgruppen;
	var partners = [];
	var events;
	var eventDates = [];
	var activeCompany;
	var singleCompanyEvents;
	var loadingSingleCompanyEvents;
	var jobs;


	$http.get("php/getTweets.php")
	.success(
		function(data) {
			// If searching for one or multiple hashtags or users, tweets = data.statuses. Otherwise tweets = data.
			tweets = data;

			for(tweet in tweets){
				var tweetEssentials = {};
				var currentTweet = tweets[tweet];
				tweetEssentials.type = "tweet";

				// Fix for internet explorer...
				var dateSubs = currentTweet.created_at.split(" ");
				tweetEssentials.created = new Date(new Date(dateSubs[0]+" "+dateSubs[1]+" "+dateSubs[2]+" "+dateSubs[5]+" "+dateSubs[3]+" GMT"+dateSubs[4]));

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
			loadingPartners = false;

			var goldPartners = [];
			var silverPartners = [];
			var startups = [];
			var lecturers = [];
			var sponsors = [];

			for(var i=0;i<data.length;i++){
				if(data[i].type === "Guld"){
					goldPartners.push(data[i]);
				} else if(data[i].type === "Silver") {
					silverPartners.push(data[i]);
				} else if(data[i].type === "Startup") {
					startups.push(data[i]);
				} else if(data[i].type === "Föreläsare") {
					lecturers.push(data[i]);
				} else if(data[i].type === "Sponsor"){
					sponsors.push(data[i]);
				} else {
					console.log("Unknown type of partner "+ data[i]);
				}
			}

			var allPartners = {"Guld":goldPartners, "Silver":silverPartners, "Startups":startups, "Föreläsare":lecturers, "Sponsorer":sponsors};
			partners = allPartners;
		});

	$http.get("php/getJobs.php")
	.success(
		function(data){
			for(i in data){
				data[i].lastDayToApply = new Date(data[i].lastDayToApply);
			}
			loadingJobs = false;
			jobs = data;
		})
	
	this.getSingleCompanyEvents = function(companyName){
		loadingSingleCompanyEvents = true;
		var req = {
	    	url: "php/getEvents.php",
	      	method: "GET",
	      	params: {singleCompanyEvents:true, companyName:companyName}
	    }

	    $http(req).success(function(data){
	    	loadingSingleCompanyEvents = false;
	      	singleCompanyEvents = data;
	    })
	}

	this.companyHasJobs = function(companyID){
		for(i in jobs){
			if(jobs[i].companyID === companyID){
				return true;
			}
		}
		return false;
	}

	this.getCompanyJobs = function(companyID){
		var companyJobs = [];
		for(i in jobs){
			if(jobs[i].companyID === companyID){
				companyJobs.push(jobs[i]);
			}
		}
		return companyJobs;
	}
	

	this.getEvents = function(){
	    $http.get("php/getEvents.php").success(function(data){

	    	for(i in data){
	    		var dateHolder = new Date(data[i].start);

	    		var eventDateNoTime = dateHolder.getDate() + "/" + dateHolder.getMonth() + "/" + dateHolder.getFullYear();
	    		data[i].start = new Date(data[i].start).getTime();
	    		if(data[i].end != null){
	    			data[i].end = new Date(data[i].end).getTime();
	    		}

	    		if(eventDates.indexOf(eventDateNoTime) === -1){
	    			eventDates.push(eventDateNoTime);
	    		}
	    	}
	      	events = data;
	    })
	}

	this.getJobByID = function(jobID){
		if(!jobs){
			return false;
		} else {
			for(job in jobs){
				if(jobs[job].id === jobID){
					return jobs[job];
				}
			}
		}
	}

	this.loadingJobs = function(){
		return loadingJobs;
	}

	this.getJobs = function(){
		return jobs;
	}

	this.loadingPartners = function(){
		return loadingPartners;
	}

	this.getSchedule = function(){
		return events;
	}

	this.getEventDates = function(){
		return eventDates;
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
  		for(type in partners){
  			for(index in partners[type]){
  				if(partners[type][index].name === partnerName){
  					return partners[type][index];
  				}
  			}
  		}
  		return false;
  	}

  	this.getBDgruppen = function(){
  		return branschdagsgruppen;
  	}

  	this.contactMe = function(contactInfo){
  		sendingEmail = true;

	    var req = {
	      	url: "php/contactMe.php",
	      	method: "GET",
	      	params: {contactInfo:contactInfo}
	    }

	    $http(req).success(function(data){
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