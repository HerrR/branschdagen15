app.controller('HomeCtrl', function ($scope, $routeParams, Model) {
	adjustFeedContainer();
	
})

app.controller('ScheduleCtrl', function ($scope, Model) {
	adjustFeedContainer();

})

app.controller('PricesCtrl', function ($scope, Model) {
	adjustFeedContainer();
	$(window).on('resize', function(){
		if($(window).width() > 710){
			adjustSilverPacket();
		} else {
			$("#silverOffer").css({'height':''});
		}
	});

	var adjustSilverPacket = function(){
		$("#silverOffer").css({'height':($("#goldOffer").height()+30+'px')});
	}
	if($(window).width() > 710){
		adjustSilverPacket();
	} else {
		$("#silverOffer").css({'height':''});
	}
	// adjustSilverPacket();
})

app.controller('ContactCtrl', function ($scope, Model) {
	adjustFeedContainer();
	$scope.branschdagsgruppen = function(){
		return Model.getBDgruppen();
	};

})

app.controller('CompanyCtrl', function ($scope, $routeParams, $location, Model) {
	adjustFeedContainer();
	$scope.companyName = $routeParams.companyName;

	$scope.companyInfo = function(){
		return Model.getPartner($scope.companyName);
	}

	if($scope.companyInfo() === false){
		 $location.path("#/home");
	}
})
