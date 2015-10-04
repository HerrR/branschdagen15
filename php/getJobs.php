<?php
	include_once('config.php');
	include_once('functions.php');

	$conn = dbConnect($hostname, $username, $password, $database);
	$query = "SELECT * FROM jobs JOIN partners ON jobs.companyID = partners.ID WHERE showOnWebsite = 1;";

	$jobs = array();

	$jobsObject = queryDb($conn, $query);

	while($line = $jobsObject->fetch_object()){
		$job;
		$job['id'] = $line->id;
		$job['companyID'] = $line->companyID;
		$job['jobTitle'] = $line->jobTitle;
		$job['jobDescription'] = $line->jobDescription;
		$job['applyTo'] = $line->applyTo;
		$job['lastDayToApply'] = date('Y/m/d H:i:s', strtotime($line->lastDayToApply));
		$job['companyName'] = $line->name;
		$job['companyLogo'] = $line->logo;

		array_push($jobs, $job);
	}

	echo json_encode($jobs);
?>