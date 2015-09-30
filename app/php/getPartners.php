<?php
	include_once('config.php');
	include_once('functions.php');

	$partnersQuery = "SELECT * FROM partners WHERE showOnWebsite = 1 ORDER BY name ASC";

	$conn = dbConnect($hostname, $username, $password, $database);

	$partnersObjects = queryDb($conn, $partnersQuery);

	$partners = array();

	while($line = $partnersObjects->fetch_object()){
		$partner;
		$partner['id'] = $line->ID;
		$partner['name'] = $line->name;
		$partner['type'] = $line->partnerType;
		$partner['description'] = $line->partnerDescription;
		$partner['placeInExpo'] = $line->placeInExpo;
		$partner['logo'] = $line->logo;
		$partner['website'] = $line->website;
		array_push($partners, $partner);
	}
	echo json_encode($partners);
?>