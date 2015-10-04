app.controller('ContactCtrl', function ($scope, Model) {
	$scope.loadingMembers = function(){
		if($scope.branschdagsgruppen() === undefined){
			return true;
		} else {
			return false;
		}
	}

	$scope.branschdagsgruppen = function(){
		return Model.getBDgruppen();
	};
})