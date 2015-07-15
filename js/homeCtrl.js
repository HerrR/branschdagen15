app.controller('HomeCtrl', function ($scope, $routeParams, Model) {
	$scope.message = Model.getMessage();
})