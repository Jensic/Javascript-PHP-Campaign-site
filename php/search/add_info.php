<!--*************************************************
                   ADD INFO
**************************************************-->

<?php

include("db.php");

if(isset($_POST["info_name"])) {
    
    $info_name = $_POST["info_name"];
    $query = "INSERT INTO fruits(title) VALUES('$info_name')";
    $query_info_name = mysqli_query($connection, $query);
    
    if(!$query_info_name) {
        
        die("QUERY FAILED");
        
    }
    
}