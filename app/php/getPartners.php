<?php
	include_once('config.php');
	include_once('functions.php');

	$partnersQuery = "SELECT * FROM partners ORDER BY name ASC";

	$conn = dbConnect($hostname, $username, $password, $database);

	$partnersObjects = queryDb($conn, $partnersQuery);

	$partners = [];

	while($line = $partnersObjects->fetch_object()){
		$partner;
		$partner['name'] = $line->name;
		$partner['type'] = $line->partnerType;
		$partner['description'] = $line->partnerDescription;
		$partner['placeInExpo'] = $line->placeInExpo;
		$partner['logo'] = $line->logo;
		$partner['website'] = $line->website;
		$partner['id'] = $line->ID;
		array_push($partners, $partner);
	}
	echo json_encode($partners);
?>