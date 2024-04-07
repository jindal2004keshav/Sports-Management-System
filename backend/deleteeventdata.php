<?php

include_once("core.php");
$connect = mysqli_connect("localhost:3308", "root", "", "sports_management_system");


$sql = "DELETE FROM participated WHERE pid = ? AND sid = ? AND tid = ?";

if (isset($_SERVER['HTTP_PLAYER']) && $_SERVER['HTTP_PLAYER'] !== "") {
    // Sanitize and use HTTP_PLAYER value
    $pid = mysqli_real_escape_string($connect, $_SERVER['HTTP_PLAYER']);
}

if (isset($_SERVER['HTTP_EVENT']) && $_SERVER['HTTP_EVENT'] !== "") {
    // Sanitize and use HTTP_PLAYER value
    $tid = mysqli_real_escape_string($connect, $_SERVER['HTTP_EVENT']);
}

if (isset($_SERVER['HTTP_SPORT']) && $_SERVER['HTTP_SPORT'] !== "") {
    // Sanitize and use HTTP_PLAYER value
    $sid = mysqli_real_escape_string($connect, $_SERVER['HTTP_SPORT']);
}

// Prepare and bind parameters
$stmt = mysqli_prepare($connect, $sql);
mysqli_stmt_bind_param($stmt, "sss", $pid, $sid, $tid);

// Execute the statement
mysqli_stmt_execute($stmt);

// Check for errors
if(mysqli_stmt_error($stmt)) {
    echo "Error: " . mysqli_stmt_error($stmt);
} else {
    echo "Delete successful!";
}

// Close statement
mysqli_stmt_close($stmt);

// Close connection
mysqli_close($connect);