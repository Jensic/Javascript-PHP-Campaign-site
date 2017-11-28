<!--*************************************************
                   PROCESS
**************************************************-->


<?php

include("db.php");

//Displaying Action Box Data

if(isset($_POST['id'])) {

    $id = mysqli_real_escape_string($connection, $_POST['id']);
    
    $query = "SELECT * FROM fruits WHERE id = {$id}";
    $query_fruit_info = mysqli_query($connection, $query);

    if(!$query_fruit_info) {

        die("QUERY Failed" . mysqli_error($connection));

    }

    while($row = mysqli_fetch_array($query_fruit_info)) {

        echo '<p id="feedback" class="bg-success"></p>';
        echo "<input rel='". $row['id']."' type='text' class='form-control title-input' value='".$row['title']."'>";
        echo "<input type='button' class='btn btn-success update' value='Uppdatera'>";
        echo "<input type='button' class='btn btn-danger delete' value='Ta bort'>";
        echo "<input type='button' class='btn btn-close' value='Stäng'>";
        

    }
}

// Updating Data

if(isset($_POST['updatethis'])) {
    
    $id = mysqli_real_escape_string($connection, $_POST['id']);
    $title = mysqli_real_escape_string($connection, $_POST['title']);
    
    $id     = $_POST['id'];
    $title  = $_POST['title'];
    
    $query = "UPDATE fruits SET title = '$title' WHERE id = $id ";
    
    $result_set = mysqli_query($connection, $query);
    
    if(!$result_set) {
        
        
        die("QUERY FAILED" . mysqli_error($connection));
    }
    
}

//Deletingg Data

if(isset($_POST['deletethis'])) {
    
    $id = mysqli_real_escape_string($connection, $_POST['id']);
    
    $id = $_POST['id'];
    
    $query = "DELETE FROM fruits WHERE id = $id ";
    
    $result_set = mysqli_query($connection, $query);
    
    if(!$result_set) {
        
        
        die("QUERY FAILED" . mysqli_error($connection));
    }
    
}

?>

<!--*************************************************
                   SEARCH JAVASCRIPT
**************************************************-->

<script>

$(document).ready(function() {
    
    var id;
    var title;
    var updatethis = "update";
    var deletethis = "delete";
    
    //Extract id and title
    
    $(".title-input").on('input', function() {
        
        id = $(this).attr('rel');
        title = $(this).val();
        
    });
    
    //  Update Button Function

    $(".update").on('click', function() {

        $.post("php/search/process.php", {id: id, title: title, updatethis: updatethis}, function(data) {
            
          $("#feedback").text("Informationen uppdaterad"); 
            
        })

    });
    
    // Delete Button Function
    
    $(".delete").on('click', function() {
        
        if(confirm('Är du säker på att du vill ta bort informationen?')) {
        
            id = $(".title-input").attr('rel');

            $.post("php/search/process.php", {id: id, deletethis: deletethis}, function(data) {

              $("#action-container").hide();

            });
            
        }

    });
    
    // Close Button Function
    
    $(".btn-close").on('click', function() {
            
        $("#action-container").hide();  

    });
    
    
});// Document ready

</script>