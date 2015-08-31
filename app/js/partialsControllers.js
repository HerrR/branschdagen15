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

})

app.controller('PricesCtrl', function ($scope, Model) {
    angular.element(document).ready(function () {
		adjustFeedContainer();
		// adjustSilverPacket();
    });

	// $(window).on('resize', function(){
	// 	if($(window).width() > 710){
	// 		adjustSilverPacket();
	// 	} else {
	// 		$("#silverOffer").css({'height':''});
	// 	}
	// });

	// var adjustSilverPacket = function(){
	// 	$("#silverOffer").css({'height':($("#goldOffer").height()+30+'px')});
	// }

	// if($(window).width() > 710){
	// 	adjustSilverPacket();
	// } else {
	// 	$("#silverOffer").css({'height':''});
	// }

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

// ****************** Disabled for first release *****************
// app.controller('CompanyCtrl', function ($scope, $routeParams, $location, Model, $http) {

//     angular.element(document).ready(function () {
// 		adjustFeedContainer();
//     });

// 	$scope.companyName = $routeParams.companyName;

// 	$scope.companyInfo = function(){
// 		adjustFeedContainer();
// 		return Model.getPartner($scope.companyName);
// 	}

// 	$scope.loadingPartners = function(){
// 		if(Model.getPartners() === undefined){
// 			adjustFeedContainer();
// 			return true;
// 		} else {
// 			adjustFeedContainer();
// 			return false;
// 		}
// 	}
	
// 	var req = {
//     	url: "php/getEvents.php",
//       	method: "GET",
//       	params: {singleCompanyEvents:true, companyName:$scope.companyName}
//     }

//     $http(req).success(function(data){
//       	console.log(data);
//     })

// 	if(!$scope.companyInfo()){
// 		if(!$scope.loadingPartners()){
// 		 	$location.path("/home");
// 		}
// 	}
// })
// ***************************************************************

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