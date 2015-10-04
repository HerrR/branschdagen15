<?php
	require_once('TwitterAPIExchange.php');
	require_once('config.php');

	$settings = array(
	    'oauth_access_token' => $oauth_access_token,
	    'oauth_access_token_secret' => $oauth_access_token_secret,
	    'consumer_key' => $consumer_key,
	    'consumer_secret' => $consumer_secret
	);
	$url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
	$getfield = '?screen_name=branschdag';
	
	// $url = 'https://api.twitter.com/1.1/search/tweets.json';
	// $getfield = '?q=#Branschdag15+OR+#Medieteknik+OR+from:SirBergeling+OR+from:Branschdag';

	$requestMethod = 'GET';
	$twitter = new TwitterAPIExchange($settings);
	$response = $twitter->setGetfield($getfield)->buildOauth($url, $requestMethod)->performRequest();
	echo $response;
?>