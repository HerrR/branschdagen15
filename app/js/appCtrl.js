app.controller('AppCtrl', function ($scope, Model) {
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
})