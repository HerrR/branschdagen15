app.controller('AppCtrl', function ($scope, $route, Model) {
	var activeMenu = false;
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

	$scope.tweets = function(){
		return Model.getTweets();
	}
})