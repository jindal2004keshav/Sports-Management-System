<?php

include_once("core.php");
$connect = mysqli_connect("localhost:3308", "root", "", "sports_management_system");


// Check connection
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    exit();
}


if (isset($_SERVER['HTTP_X_REQUESTED_FROM']) && $_SERVER['HTTP_X_REQUESTED_FROM'] === "RemoveLive") {
    $sql = "UPDATE tournament
    SET live = 'no'";

    if (isset($_SERVER['HTTP_TOURID']) && $_SERVER['HTTP_TOURID'] !== "") {
        // Sanitize and use HTTP_EVTID value
        $evtid = mysqli_real_escape_string($connect, $_SERVER['HTTP_TOURID']);
        $sql .= " WHERE tid = ?";
    }

    // Prepare statement
    $stmt = mysqli_prepare($connect, $sql);

    if ($stmt === false) {
        echo "Failed to prepare statement: " . mysqli_error($connect);
        exit();
    }

    if (isset($evtid)) {
        // Bind parameters
        mysqli_stmt_bind_param($stmt, 's', $evtid);
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