app.controller('CompanyCtrl', function ($scope, $routeParams, $location, Model, $http) {

	angular.element(document).ready(function () {
		adjustFeedContainer();
	});

	$scope.companyName = $routeParams.companyName;
	Model.getSingleCompanyEvents($scope.companyName);

	$scope.companyInfo = function(){
		adjustFeedContainer();
		return Model.getPartner($scope.companyName);
	}

	$scope.loadingPartners = function(){
		return Model.loadingPartners();
	}

	if(!$scope.companyInfo()){
		if(!$scope.loadingPartners()){
		 	$location.path("/home");
		}
	} else {
		if($scope.companyInfo().description === null){
			window.location.replace($scope.companyInfo().website);
		}
	}
})