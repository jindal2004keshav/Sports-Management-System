<?php

include_once("core.php");
$connect = mysqli_connect("localhost:3308", "root", "", "sports_management_system");



if (isset($_SERVER['HTTP_SPORTSID']) && $_SERVER['HTTP_SPORTSID'] !== "") {
    $sportsid = mysqli_real_escape_string($connect, $_SERVER['HTTP_SPORTSID']);
}

if (isset($_SERVER['HTTP_TOURID']) && $_SERVER['HTTP_TOURID'] !== "") {
    $tourid = mysqli_real_escape_string($connect, $_SERVER['HTTP_TOURID']);
}

if (isset($_SERVER['HTTP_ROLLNO']) && $_SERVER['HTTP_ROLLNO'] !== "") {
    $rollno = mysqli_real_escape_string($connect, $_SERVER['HTTP_ROLLNO']);
}

if (isset($_SERVER['HTTP_NAME']) && $_SERVER['HTTP_NAME'] !== "") {
    $playername = mysqli_real_escape_string($connect, $_SERVER['HTTP_NAME']);
}

if (isset($_SERVER['HTTP_DOB']) && $_SERVER['HTTP_DOB'] !== "") {
    $dob = mysqli_real_escape_string($connect, $_SERVER['HTTP_DOB']);
}

if (isset($_SERVER['HTTP_GENDER']) && $_SERVER['HTTP_GENDER'] !== "") {
    $gender = mysqli_real_escape_string($connect, $_SERVER['HTTP_GENDER']);
}

if (isset($_SERVER['HTTP_MOBILE']) && $_SERVER['HTTP_MOBILE'] !== "") {
    $mobile = mysqli_real_escape_string($connect, $_SERVER['HTTP_MOBILE']);
}

if (isset($_SERVER['HTTP_EMAIL']) && $_SERVER['HTTP_EMAIL'] !== "") {
    $email = mysqli_real_escape_string($connect, $_SERVER['HTTP_EMAIL']);
}
        $insertQuery1 = "INSERT IGNORE INTO player (pid, pname, DOB, gender, mobile_no, email) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = mysqli_prepare($connect, $insertQuery1);
        mysqli_stmt_bind_param($stmt, "isssss", $rollno, $playername, $dob, $gender, $mobile, $email);
        mysqli_stmt_execute($stmt);

        if (mysqli_stmt_error($stmt)) {
            echo "Error: " . mysqli_stmt_error($stmt);
        } else {
            echo "Player Table added.";
        }

        mysqli_stmt_close($stmt);

        // Inserting into other tables
        $insertQuery2 = "INSERT IGNORE INTO plays (sid, pid) VALUES (?, ?)";
        $stmt2 = mysqli_prepare($connect, $insertQuery2);
        mysqli_stmt_bind_param($stmt2, "si", $sportsid, $rollno);
        mysqli_stmt_execute($stmt2);

        if (mysqli_stmt_error($stmt2)) {
            echo "Error: " . mysqli_stmt_error($stmt2);
        } else {
            echo "Plays Table added.";
        }

        mysqli_stmt_close($stmt2);

        $insertQuery3 = "INSERT IGNORE INTO participated (pid, tid, sid) VALUES (?, ?, ?)";
        $stmt3 = mysqli_prepare($connect, $insertQuery3);
        mysqli_stmt_bind_param($stmt3, "iss", $rollno, $tourid, $sportsid);
        mysqli_stmt_execute($stmt3);

        if (mysqli_stmt_error($stmt3)) {
            echo "Error: " . mysqli_stmt_error($stmt3);
        } else {
            echo "Participated Table Added.";
        }

        mysqli_stmt_close($stmt3);

mysqli_close($connect);
