<?php
$connect = mysqli_connect("localhost:3308","root","","sports_management_system");
$sql = "SELECT * FROM tournament";
$result = mysqli_query($connect, $sql);
$jason_array = array();
while ($row = mysqli_fetch_assoc($result)) {
    $jason_array[] = $row;
}

echo json_encode($jason_array);
