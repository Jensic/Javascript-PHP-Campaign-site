<!--*************************************************
                   DISPLAY INFO
**************************************************-->

<?php

include("db.php");

$query = "SELECT * FROM fruits";
$query_fruit_info = mysqli_query($connection, $query);

if(!$query_fruit_info) {
    
    die("QUERY Failed" . mysqli_error($connection));
    
}

while($row = mysqli_fetch_array($query_fruit_info)) {
    
    echo "<tr>";
    
    echo "<td><a rel='".$row['id']."' class='title-link' href='javascript:void(0)'>{$row['title']}</a></td>";
    
    echo "</tr>";
    
}

?>


<script>
    
$(document).ready(function() {
    
    $(".title-link").on('click', function() {
        
        $("#action-container").show();
        
        var id = $(this).attr("rel");
        
        $.post("php/search/process.php", {id: id}, function(data) {
            
            $("#action-container").html(data);
            
        });
        
    });
});

</script>