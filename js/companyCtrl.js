app.controller('CompanyCtrl', function ($scope, $routeParams, $location, Model, $http) {

	$scope.companyName = $routeParams.companyName;

	$scope.companyInfo = function(){
		return Model.getPartner($scope.companyName);
	}

	$scope.loadingPartners = function(){
		return Model.loadingPartners();
	}

	$scope.hasJobs = function(){
		if($scope.companyInfo()){
			return Model.companyHasJobs($scope.companyInfo().id);
		}
	}

	$scope.companyJobs = function(){
		return Model.getCompanyJobs($scope.companyInfo().id);
	}

	$scope.goToJob = function(jobID){
		$location.path("/intervjuer/"+jobID);
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