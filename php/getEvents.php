<?php
	include_once('config.php');
	include_once('functions.php');

	$singleCompanyEvents =  $_GET["singleCompanyEvents"];
	$conn = dbConnect($hostname, $username, $password, $database);

	if($singleCompanyEvents){
		$eventsQuery = "SELECT events.name name, events.type type, events.eventDescription description, events.eventStart eventStart, events.eventEnd eventEnd 
		FROM events JOIN partnerEvent ON events.id = partnerEvent.eventID JOIN partners ON partnerEvent.partnerID = partners.id 
		WHERE partners.name = '".$_GET["companyName"]."';";
	} else {
		$eventsQuery = "SELECT events.name name, events.type type, events.eventDescription description, events.eventStart eventStart, events.eventEnd eventEnd 
		FROM events ORDER BY eventStart ASC";
	}
	
	$events = array();

	$eventsObject = queryDb($conn, $eventsQuery);
	while($line = $eventsObject->fetch_object()){
		$event;
		$event['name'] = $line->name;
		$event['type'] = $line->type;
		$event['description'] = $line->description;
		$event['start'] = $line->eventStart;
		$event['end'] = $line->eventEnd;
		array_push($events, $event);
	}

	echo json_encode($events);
?>