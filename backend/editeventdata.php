<?php

include_once("core.php");

$connect = mysqli_connect("localhost:3308", "root", "", "sports_management_system");

$sql = "UPDATE player SET pname = ? , DOB = ? , gender = ? , mobile_no = ? , email = ? WHERE pid = ?";

if (isset($_SERVER['HTTP_NAME']) && $_SERVER['HTTP_NAME'] !== "") {
    // Sanitize and use HTTP_NAME value
    $playername = mysqli_real_escape_string($connect, $_SERVER['HTTP_NAME']);
}

if (isset($_SERVER['HTTP_DOB']) && $_SERVER['HTTP_DOB'] !== "") {
    // Sanitize and use HTTP_DOB value
    $dob = mysqli_real_escape_string($connect, $_SERVER['HTTP_DOB']);
}

if (isset($_SERVER['HTTP_GENDER']) && $_SERVER['HTTP_GENDER'] !== "") {
    // Sanitize and use HTTP_GENDER value
    $gender = mysqli_real_escape_string($connect, $_SERVER['HTTP_GENDER']);
}

if (isset($_SERVER['HTTP_MOBILE']) && $_SERVER['HTTP_MOBILE'] !== "") {
    // Sanitize and use HTTP_MOBILE value
    $mobile = mysqli_real_escape_string($connect, $_SERVER['HTTP_MOBILE']);
}

if (isset($_SERVER['HTTP_EMAIL']) && $_SERVER['HTTP_EMAIL'] !== "") {
    // Sanitize and use HTTP_EMAIL value
    $email = mysqli_real_escape_string($connect, $_SERVER['HTTP_EMAIL']);
}

if (isset($_SERVER['HTTP_PLAYER']) && $_SERVER['HTTP_PLAYER'] !== "") {
    // Sanitize and use HTTP_PLAYER value
    $playerid = mysqli_real_escape_string($connect, $_SERVER['HTTP_PLAYER']);
}

// Prepare and bind parameters
$stmt = mysqli_prepare($connect, $sql);
mysqli_stmt_bind_param($stmt, "sssssi", $playername, $dob, $gender, $mobile, $email, $playerid);

// Execute the statement
mysqli_stmt_execute($stmt);

// Check for errors
if(mysqli_stmt_error($stmt)) {
    echo "Error: " . mysqli_stmt_error($stmt);
} else {
    echo "Update successful!";
}

// Close statement
mysqli_stmt_close($stmt);

// Close connection
mysqli_close($connect);