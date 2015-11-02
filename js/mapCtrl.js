app.controller('MapCtrl', function ($scope, Model) {
	$scope.textIndicate = function(obj, active){
		if(active){
			document.getElementById(obj+"-square").setAttribute("class", "boothSquare boxIndicated");
		} else {
			document.getElementById(obj+"-square").setAttribute("class", "boothSquare");
		}
	}

	$scope.boxIndicate = function(obj, active){
		if(active){
			document.getElementById(obj+"-text").setAttribute("class", "mapPartnerText active");
		} else {
			document.getElementById(obj+"-text").setAttribute("class", "mapPartnerText");
		}
	}

	$scope.partners = function(){
		return Model.getPartners();
	}

	$scope.columnDistribution = function(){
		var toBeReturned = [];
	    var checkDuplicate = function(toBeTestet){
	      for(partner in toBeReturned){
	        if(toBeTestet.name === toBeReturned[partner].name){
	          return false;
	        }
	      }
	      toBeReturned.push(toBeTestet);
	    }

	    for(category in $scope.partners()){
	      for(partner in $scope.partners()[category]){
	        if($scope.partners()[category][partner].placeInExpo != null){
	          checkDuplicate($scope.partners()[category][partner])
	        }
	      }
	    }
	    // console.log([ Math.ceil(toBeReturned.length/2), Math.floor(toBeReturned.length/2) ]);
		return [ Math.ceil(toBeReturned.length/2), Math.floor(toBeReturned.length/2) ];
	}


})