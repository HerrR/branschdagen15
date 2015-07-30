app.controller('AppCtrl', function ($scope, $route, Model) {
	var activeMenu = false;
	var postIndex = 0;

	$scope.nextPage = function(){
		if(postIndex < $scope.socialMedia().length-1){
			postIndex += 1;
			var nextPost = "#post_"+postIndex;
			$("#feedContent").animate({scrollTop: $("#feedContent").scrollTop = $("#feedContent").scrollTop() + $(nextPost).position().top - 130}, 200);
		}
	};

	$scope.previousPage = function(){
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
		adjustFeedContainer();
		return Model.getSocialMedia();
	}
})

app.filter('startFrom', function() {
    return function(input, start) {
        var start = +start;
        return input.slice(start);
    }
});

$(window).on('resize', function(){
	adjustFeedContainer();
});

var adjustFeedContainer = function(){
	$("#feedContainer").css({'height':($(".container").height()+'px')});
}