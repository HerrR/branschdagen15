app.controller('SingleJobCtrl', function ($scope, Model, $location, $routeParams){

	$scope.activeJobID = $routeParams.jobID;

	$scope.loadingJobs = function(){
		return Model.loadingJobs();
	}

	$scope.activeJob = function(){
		if(!$scope.loadingJobs()){
			return Model.getJobByID($scope.activeJobID);
		}
	}

	if(!$scope.loadingJobs()){
		if(!$scope.activeJob()){
			$location.path("#/jobb");
		}
	}
})