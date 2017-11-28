<!--*************************************************
                   SEARCH
**************************************************-->


<?php

include("db.php");

$search = $_POST["search"];

if(!empty($search)) {
    
    $query = "SELECT * FROM fruits WHERE title LIKE '$search%' ";
    $search_query = mysqli_query($connection,$query);
    $count = mysqli_num_rows($search_query);
    
    if(!$search_query) {
        
        die("Query Failed" . mysqli_error($connection));
        
    }
    
    if($count <= 0) {
        
        echo "Ledsen vi har inte den informationen";
        
    } else {
        
    while($row = mysqli_fetch_array($search_query)) {
        
        $brand = $row["title"];
        
        ?>
        
        <ul class="list-unstyled">
            
            <?php
            
                echo "<li>{$brand} finns i databasen</li>";
        
            ?>
        
        </ul>
        
    <?php }
        
    }
    
}

?>