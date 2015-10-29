app.controller('AppCtrl', function ($scope, $route, Model, $location) {
	var activeMenu = false;
	var postIndex = 0;

	$scope.nextPost = function(){
		if(postIndex < $scope.socialMedia().length-1){
			postIndex += 1;
			var nextPost = "#post_"+postIndex;
			$("#feedContent").animate({scrollTop: $("#feedContent").scrollTop = $("#feedContent").scrollTop() + $(nextPost).position().top - 130}, 200);
		}
	};

	$scope.previousPost = function(){
		if(postIndex > 0){
			postIndex -= 1;
			var previousPost = "#post_"+postIndex;
			$("#feedContent").animate({scrollTop: $("#feedContent").scrollTop = $("#feedContent").scrollTop() + $(previousPost).position().top -130}, 200);
		}
	}

	$scope.toggleMenu = function(){
		if(activeMenu){
			$("#menu").removeClass("menuOpen");
			$("#menu").addClass("menuClosed");

			activeMenu = false;
		} else {
			$("#menu").removeClass("menuClosed");
			$("#menu").addClass("menuOpen");
			activeMenu = true;
		}
	}

	$scope.$route = $route;


	$scope.loadingTweets = function(){
		return Model.loadingTweets();
	}

	$scope.loadingInstagram = function(){
		return Model.loadingInstagram();
	}

	$scope.loadingSocialMedia = function(){
		return $scope.loadingInstagram() || $scope.loadingTweets();
	}

	$scope.socialMedia = function(){
		return Model.getSocialMedia();
	}

	// $scope.partners = function(){
	// 	return Model.getPartners();
	// }

	$scope.goldPartners = function(){
		return Model.getPartners()["Guld"];
	}

	$scope.silverPartners = function(){
		return Model.getPartners()["Silver"];
	}

	$scope.startups = function(){
		return Model.getPartners()["Startups"];
	}

	$scope.lecturers = function(){
		return Model.getPartners()["Föreläsare"];
	}

	$scope.sponsors = function(){
		return Model.getPartners()["Sponsorer"];
	}

	$scope.loadingPartners = function(){
		return Model.loadingPartners();
	}

	$scope.companyInfoScroll = function(companyName){
		// Disabled for now
		var chosenCompany = Model.getPartner(companyName);
		// console.log(chosenCompany);
		if(companyName != null){
			if(chosenCompany.description === null){
				if(chosenCompany.website != null){
					window.open(chosenCompany.website, '_blank');
				}
			} else {
				$location.path("/foretag/"+companyName);
				
				$('html, body').animate({scrollTop: $("#container").offset().top}, 200);
			}
		}
	}
})

app.filter('capitalize', function() {
    return function(input) {
      return input.charAt(0).toUpperCase() + input.substr(1).toLowerCase();
    }
});