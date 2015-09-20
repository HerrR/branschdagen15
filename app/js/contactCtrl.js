app.controller('ContactCtrl', function ($scope, Model) {
    angular.element(document).ready(function () {
		  adjustFeedContainer();
    });

	$scope.loadingMembers = function(){
		if($scope.branschdagsgruppen() === undefined){
			return true;
		} else {
			return false;
		}
	}

	$scope.branschdagsgruppen = function(){
		adjustFeedContainer();
		return Model.getBDgruppen();
	};
})