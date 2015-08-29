<?php
	include_once('config.php');
	include_once('functions.php');

	$teamQuery = "SELECT * FROM team ORDER BY viewWeight DESC, name ASC";

	$conn = dbConnect($hostname, $username, $password, $database);

	$teamObjects = queryDb($conn, $teamQuery);

	$team = [];

	while($line = $teamObjects->fetch_object()){
		$teamMember;
		$teamMember['name'] = $line->name;
		$teamMember['role'] = $line->role;
		$teamMember['email'] = $line->email;
		$teamMember['phone'] = $line->phone;
		$teamMember['image'] = $line->image;
		array_push($team, $teamMember);
	}
	echo json_encode($team);
?>