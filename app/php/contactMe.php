<?php //contactMe.php
	$contactInfo = json_decode($_GET["contactInfo"], TRUE);
	$company = $contactInfo['company'];
	$email = $contactInfo['email'];
	$name = $contactInfo['name'];
	$packageType = $contactInfo['packageType'];

	$to = "rickard.bergeling@gmail.com";
	$subject = "Företagskontakt branschdagen - ".$company;
	$message = "Ett nytt företag har visat intresse av att vara med under branschdagen!

	Namn: ".$name."
	Mailaddress: ".$email."
	Företag: ".$company."
	Intresserad av: ".$packageType;

	$headers = "From: branschdag@bergeling.com";

	mail($to,$subject,$message,$headers);
?>