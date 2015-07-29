<?php
	require_once('TwitterAPIExchange.php');

	$settings = array(
	    'oauth_access_token' => "616422343-Ij0yKve2M2ZWW7RqdMDorcSuNFCG1gYcvpAH9D9E",
	    'oauth_access_token_secret' => "7jfGFZa6Wgqb8J1EPUOazeRJbQrerYs92GasXpuxSIeJF",
	    'consumer_key' => "BvN5PsvnqjGgI2Skgu4rcZput",
	    'consumer_secret' => "yAd7DMVixldCPrkiXOTz4j9f5cpZJYbc7dA8XDhgofG4ti9pCq"
	);

	$url = 'https://api.twitter.com/1.1/search/tweets.json';
	$getfield = '?q=#kth';

	$requestMethod = 'GET';
	$twitter = new TwitterAPIExchange($settings);
	$response = $twitter->setGetfield($getfield)->buildOauth($url, $requestMethod)->performRequest();
	echo $response;
?>