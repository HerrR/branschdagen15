app.controller('PackageCtrl', function ($scope, $routeParams, $location, Model) {
    angular.element(document).ready(function () {
		  adjustFeedContainer();
    });

    $scope.packageType = $routeParams.packageType;

    var packages = ["guldpaketet", "silverpaketet", "föreläsningspaketet"];

    if(packages.indexOf($scope.packageType) === -1){
    	$location.path("/prislista");
    }

  	$scope.contactInfo = {
    	name: '',
    	email: '',
    	company: '',
    	packageType: $scope.packageType
  	};

  	$scope.sendingEmail = function(){
  		return Model.sendingEmail();
  	}

  	$scope.emailSent = function(){
  		return Model.emailSent();
  	}

	var validEmail = function(){
		var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		return re.test($scope.contactInfo.email);
	}

	var validName = function(){
		if($scope.contactInfo.name.length > 0){
			return true;
		} else {
			return false;
		}
	}

	var validCompany = function(){
		if($scope.contactInfo.company.length > 0){
			return true;
		} else {
			return false;
		}
	}

	$scope.completeInfo = function(){
		return validEmail() && validName() && validCompany();
	}

  $scope.contactMe = function(){
  	if(Model.sendingEmail() === false){
  		if($scope.completeInfo()){
  			Model.contactMe($scope.contactInfo);	
  		}
  	}
  }
})