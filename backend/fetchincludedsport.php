<?php

include_once("core.php");
$connect = mysqli_connect("localhost:3308", "root", "", "sports_management_system");

// Establish connection

// Check connection
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    exit();
}

if (isset($_SERVER['HTTP_X_REQUESTED_FROM']) && $_SERVER['HTTP_X_REQUESTED_FROM'] === "Events") {
    $sql = "SELECT sports.sname
        FROM included
        JOIN sports ON included.sid = sports.sid";

    if (isset($_SERVER['HTTP_EVENT']) && $_SERVER['HTTP_EVENT'] !== "") {
        // Sanitize and use HTTP_EVTID value
        $evtName = mysqli_real_escape_string($connect, $_SERVER['HTTP_EVENT']);
        $sql .= " WHERE included.tid = ?";
    }

    // Prepare statement
    $stmt = mysqli_prepare($connect, $sql);

    if ($stmt === false) {
        echo "Failed to prepare statement: " . mysqli_error($connect);
        exit();
    }

    if (isset($evtName)) {
        // Bind parameters
        mysqli_stmt_bind_param($stmt, 's', $evtName);
    }

    // Execute statement
    mysqli_stmt_execute($stmt);

    // Get result
    $result = mysqli_stmt_get_result($stmt);

    // Fetch data
    $json_array = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $json_array[] = $row;
    }

    // Output JSON
    echo json_encode($json_array);

    // Close statement and connection
    mysqli_stmt_close($stmt);
    mysqli_close($connect);
}
elseif(isset($_SERVER['HTTP_X_REQUESTED_FROM']) && $_SERVER['HTTP_X_REQUESTED_FROM'] === "Sports"){ 
    $sql = "SELECT distinct tournament.tname
    FROM included
    JOIN tournament ON included.tid = tournament.tid";

    if(isset($_SERVER["HTTP_SPORT"]) && $_SERVER["HTTP_SPORT"] !== ""){
        $sportname = mysqli_real_escape_string($connect, $_SERVER['HTTP_SPORT']);
        $sql .= " WHERE included.sid LIKE CONCAT(?, '%') AND tournament.live = 'no'";
    }

    // Prepare statement
    $stmt = mysqli_prepare($connect, $sql);

    if ($stmt === false) {
        echo "Failed to prepare statement: " . mysqli_error($connect);
        exit();
    }

    if(isset($sportname)){
        mysqli_stmt_bind_param($stmt, 's', $sportname);
    }

    // Execute statement
    $success = mysqli_stmt_execute($stmt);

    if (!$success) {
        echo "Failed to execute statement: " . mysqli_error($connect);
        exit();
    }

    // Get the result
    $result = mysqli_stmt_get_result($stmt);

    $json_array = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $json_array[] = $row;
    }
    echo json_encode($json_array);

    mysqli_stmt_close($stmt);
    mysqli_close($connect);
}
elseif(isset($_SERVER['HTTP_X_REQUESTED_FROM']) && $_SERVER['HTTP_X_REQUESTED_FROM'] === "Register"){ 
    $sql = "SELECT distinct sports.sname, sports.sid
    FROM included
    JOIN sports on sports.sid = included.sid";

    if(isset($_SERVER["HTTP_EVENT"]) && $_SERVER["HTTP_EVENT"] !== ""){
        $eventname = mysqli_real_escape_string($connect, $_SERVER['HTTP_EVENT']);
        $sql .= " WHERE included.tid = ?";
    }

    // Prepare statement
    $stmt = mysqli_prepare($connect, $sql);

    if ($stmt === false) {
        echo "Failed to prepare statement: " . mysqli_error($connect);
        exit();
    }

    if(isset($eventname)){
        mysqli_stmt_bind_param($stmt, 's', $eventname);
    }

    // Execute statement
    $success = mysqli_stmt_execute($stmt);

    if (!$success) {
        echo "Failed to execute statement: " . mysqli_error($connect);
        exit();
    }

    // Get the result
    $result = mysqli_stmt_get_result($stmt);

    $json_array = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $json_array[] = $row;
    }
    echo json_encode($json_array);

    mysqli_stmt_close($stmt);
    mysqli_close($connect);
}
// $sql = "SELECT sports.sname
//         FROM included
//         JOIN sports ON included.sid = sports.sid";

// if (isset($_SERVER['HTTP_EVENT']) && $_SERVER['HTTP_EVENT'] !== "") {
   
//     $evtName = mysqli_real_escape_string($connect, $_SERVER['HTTP_EVENT']);
//     $sql .= " WHERE included.tid = ?";
// }

// $stmt = mysqli_prepare($connect, $sql);

// if ($stmt === false) {
//     echo "Failed to prepare statement: " . mysqli_error($connect);
//     exit();
// }

// if (isset($evtName)) {
 
//     mysqli_stmt_bind_param($stmt, 's', $evtName);
// }

// mysqli_stmt_execute($stmt);

// $result = mysqli_stmt_get_result($stmt);

// $json_array = array();
// while ($row = mysqli_fetch_assoc($result)) {
//     $json_array[] = $row;
// }

// echo json_encode($json_array);

// mysqli_stmt_close($stmt);
// mysqli_close($connect);
