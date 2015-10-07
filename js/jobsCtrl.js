app.controller('JobsCtrl', function ($scope, Model, $location) {

    $scope.jobs = function(){
    	return Model.getJobs();
    }

    $scope.goToJob = function(jobID){
    	$location.path("/intervjuer/"+jobID);
    }
})