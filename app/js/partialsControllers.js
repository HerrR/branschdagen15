app.controller('HomeCtrl', function ($scope, $routeParams, Model) {
	
})

app.controller('ExpoCtrl', function ($scope, Model) {

})

app.controller('DinnerCtrl', function ($scope, Model) {
	
})

app.controller('PricesCtrl', function ($scope, Model) {
	
})

app.controller('ContactCtrl', function ($scope, Model) {

})

app.controller('CompanyCtrl', function ($scope, $routeParams, $location, Model) {
	$scope.companyName = $routeParams.companyName;
	$scope.companyInfo = function(){
		return Model.getPartner($scope.companyName);
	}

	if($scope.companyInfo() === false){
		 $location.path("#/home");
	}
})
