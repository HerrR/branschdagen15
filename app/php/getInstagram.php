<?php
	function callInstagram($url){
		$ch = curl_init();
		curl_setopt_array($ch, array(
			CURLOPT_URL => $url,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_SSL_VERIFYPEER => false,
			CURLOPT_SSL_VERIFYHOST => 2
		));

		$result = curl_exec($ch);
		curl_close($ch);
		return $result;
	}

	$tag = 'kth';
	$client_id = "8f97c6503a904eb9b5033d5549e70357";

	$url = 'https://api.instagram.com/v1/tags/'.$tag.'/media/recent?client_id='.$client_id;

	$inst_stream = callInstagram($url);
	echo $inst_stream;
?>