<?php

include_once("core.php");


$connect = mysqli_connect("localhost:3308", "root", "", "sports_management_system");



if (isset($_SERVER['HTTP_X_REQUESTED_FROM']) && $_SERVER['HTTP_X_REQUESTED_FROM'] === "HomeEvents") {
    $sql = "SELECT * FROM tournament WHERE live = 'no'";
} elseif (isset($_SERVER['HTTP_X_REQUESTED_FROM']) && $_SERVER['HTTP_X_REQUESTED_FROM'] === "iitspirit") {
    $sql = "SELECT * FROM tournament WHERE tid LIKE 'IGST%' AND live = 'no'";
} elseif (isset($_SERVER['HTTP_X_REQUESTED_FROM']) && $_SERVER['HTTP_X_REQUESTED_FROM'] === "iiitcarnival") {
    $sql = "SELECT * FROM tournament WHERE tid LIKE 'IGSC%' AND live = 'no'";
} elseif (isset($_SERVER['HTTP_X_REQUESTED_FROM']) && $_SERVER['HTTP_X_REQUESTED_FROM'] === "interiiit") {
    $sql = "SELECT * FROM tournament WHERE tid LIKE 'IISM%' AND live = 'no'";
} elseif (isset($_SERVER['HTTP_X_REQUESTED_FROM']) && $_SERVER['HTTP_X_REQUESTED_FROM'] === "Register") {
    $sql = "SELECT * FROM tournament WHERE live = 'yes'";
}

$result = mysqli_query($connect, $sql);
$jason_array = array();
while ($row = mysqli_fetch_assoc($result)) {
    $jason_array[] = $row;
}
echo json_encode($jason_array);