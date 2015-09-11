app.filter('dateFilter', function() {
  	return function(events, date) {
  		var filtered = [];
  		for(e in events){
  			var dateHolder = new Date(events[e].start);
  			var transformedDate = dateHolder.getDate() + "/" + dateHolder.getMonth() + "/" + dateHolder.getFullYear();
  			if(transformedDate === date){
  				filtered.push(events[e]);
  			}
  		}
  		// console.log(events, date);
    return filtered;
  }
});

app.filter('dateToString', function(){
	return function(date){
		var months = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"];
		return date.split("/")[0]+" "+months[parseInt(date.split("/")[1])]+" "+date.split("/")[2];
	}
})

app.controller('HomeCtrl', function ($scope, Model) {
    angular.element(document).ready(function () {
		adjustFeedContainer();
    });
})

app.controller('ScheduleCtrl', function ($scope, Model) {
    angular.element(document).ready(function () {
		adjustFeedContainer();
    });

    Model.getEvents();

    $scope.schedule = function(){
    	return Model.getSchedule();
    }

    $scope.loadingSchedule = function(){
    	if(Model.getSchedule() === undefined){
    		return true;
    	} else {
    		return false;
    	}
    }

    $scope.eventDates = function(){
    	return Model.getEventDates();
    }

})

app.controller('PricesCtrl', function ($scope, Model) {
    angular.element(document).ready(function () {
		adjustFeedContainer();
    });
})

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
	}
})

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