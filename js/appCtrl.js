app.controller('AppCtrl', function ($scope, Model) {
	var activeMenu = false;
	$scope.toggleMenu = function(){
		console.log("Menu toggled!");
		if(activeMenu){
			console.log("closing menu");
			$("#menu").removeClass("menuOpen");
			$("#menu").addClass("menuClosed");

			activeMenu = false;
		} else {
			console.log("opening menu");
			$("#menu").removeClass("menuClosed");
			$("#menu").addClass("menuOpen");
			activeMenu = true;
		}
	}
})