<?php //functions
	function queryDb($conn, $query){
		if (($result = mysqli_query($conn, $query)) === false) {
	       printf("Query failed: %s<br />\n%s", $query, mysqli_error($conn));
	       exit();
	    }
	    return $result;
	}

	function dbConnect($hostname, $username, $password, $database){	
		$conn = mysqli_connect($hostname, $username, $password, $database);
		
	    if (mysqli_connect_errno()) {
	        printf("Connect failed: %s\n", mysqli_connect_error());
	        exit();
	    };
	    $conn->set_charset("utf8");
	    return $conn;
	}
?>