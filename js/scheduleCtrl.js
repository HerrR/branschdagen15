app.controller('ScheduleCtrl', function ($scope, Model) {

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