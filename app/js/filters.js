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
})