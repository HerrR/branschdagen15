app.controller('SingleJobCtrl', function ($scope, Model, $location, $routeParams){

	$scope.activeJobID = $routeParams.jobID;

	$scope.loadingJobs = function(){
		return Model.loadingJobs();
	}

	$scope.activeJob = function(){
		if(!$scope.loadingJobs()){
			// console.log(Model.getJobByID($scope.activeJobID));
			return Model.getJobByID($scope.activeJobID);
		}
	}

	if(!$scope.loadingJobs()){
		if(!$scope.activeJob()){
			$location.path("#/jobb");
		}
	}
})