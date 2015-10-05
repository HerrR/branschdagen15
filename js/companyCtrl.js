app.controller('CompanyCtrl', function ($scope, $routeParams, $location, Model, $http) {

	$scope.companyName = $routeParams.companyName;
	// Model.getSingleCompanyEvents($scope.companyName);

	$scope.companyInfo = function(){
		return Model.getPartner($scope.companyName);
	}

	// console.log($scope.companyInfo());

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
		$location.path("/jobb/"+jobID);
	}

	// if($scope.hasJobs()){
	// 	$scope.companyJobs = Model.getCompanyJobs($scope.companyInfo().id);
	// }

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