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
    return filtered;
  }
});

app.filter('dateToString', function(){
	return function(date){
		var months = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"];
    return date.split("/")[0]+" "+months[parseInt(date.split("/")[1])]+" "+date.split("/")[2];
	}
});

app.filter('swedishDate', function(){
  return function(date){
    if(date != undefined){
      var months = ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"];
      return date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
    } else {
      return false;
    }
  }
})

app.filter('hasPlaceInExpo', function(){
  return function(partners){
    var toBeReturned = [];

    var checkDuplicate = function(toBeTestet){
      for(partner in toBeReturned){
        if(toBeTestet.name === toBeReturned[partner].name){
          return false;
        }
      }
      toBeReturned.push(toBeTestet);
    }

    for(category in partners){
      for(partner in partners[category]){
        if(partners[category][partner].placeInExpo != null){
          checkDuplicate(partners[category][partner])
        }
      }
    }

    toBeReturned.sort(function(x, y){ 
      if (x.placeInExpo < y.placeInExpo) {
        return -1;
      }
      if (x.placeInExpo > y.placeInExpo) {
          return 1;
      }
      return 0;
    });
    return toBeReturned;
  }
})