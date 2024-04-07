<?php

include_once("core.php");

if(isset($_SERVER['HTTP_X_REQUESTED_FROM']) && $_SERVER['HTTP_x_REQUESTED_FROM'] === "HomeEvents") {
    $connect = mysqli_connect("localhost:3308","root","","sports_management_system");
$sql = "SELECT * FROM tournament";
$result = mysqli_query($connect, $sql);
$jason_array = array();
while ($row = mysqli_fetch_assoc($result)) {
    $jason_array[] = $row;
}

echo json_encode($jason_array);
}



