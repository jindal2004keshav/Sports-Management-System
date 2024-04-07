<?php

include_once("core.php");
$connect = mysqli_connect("localhost:3308", "root", "", "sports_management_system");


if (
    isset($_SERVER['HTTP_PASS'], $_SERVER['HTTP_ROLL'], $_SERVER['HTTP_NAME'], $_SERVER['HTTP_DOB'], $_SERVER['HTTP_GENDER'], $_SERVER['HTTP_MOBILE'], $_SERVER['HTTP_EMAIL'])
    && $_SERVER['HTTP_PASS'] !== "" 
    && $_SERVER['HTTP_ROLL'] !== "" 
    && $_SERVER['HTTP_NAME'] !== "" 
    && $_SERVER['HTTP_DOB'] !== "" 
    && $_SERVER['HTTP_GENDER'] !== "" 
    && $_SERVER['HTTP_MOBILE'] !== "" 
    && $_SERVER['HTTP_EMAIL'] !== ""
) {
    $password = mysqli_real_escape_string($connect, $_SERVER['HTTP_PASS']);
    $rollno = mysqli_real_escape_string($connect, $_SERVER['HTTP_ROLL']);
    $playername = mysqli_real_escape_string($connect, $_SERVER['HTTP_NAME']);
    $dob = mysqli_real_escape_string($connect, $_SERVER['HTTP_DOB']);
    $gender = mysqli_real_escape_string($connect, $_SERVER['HTTP_GENDER']);
    $mobile = mysqli_real_escape_string($connect, $_SERVER['HTTP_MOBILE']);
    $email = mysqli_real_escape_string($connect, $_SERVER['HTTP_EMAIL']);

    $insertQuery = "INSERT IGNORE INTO users (email, password, name, DOB, rollno, gender, mobile) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = mysqli_prepare($connect, $insertQuery);
    
    mysqli_stmt_bind_param($stmt, "sssssss", $email, $password, $playername, $dob, $rollno, $gender, $mobile);
    mysqli_stmt_execute($stmt);

    if (mysqli_stmt_error($stmt)) {
        echo "Error: " . mysqli_stmt_error($stmt);
    } else {
        echo "Player Table added.";
    }

    mysqli_stmt_close($stmt);
} else {
    echo "Missing required fields.";
}
?>
