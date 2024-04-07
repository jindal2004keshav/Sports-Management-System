<?php

include_once("core.php");
$connect = mysqli_connect("localhost:3308", "root", "", "sports_management_system");


// Set the default SQL query
$sql = "SELECT tournament.tname, participated.pid, player.pname, player.DOB, player.gender, player.mobile_no, player.email, sports.sid, participated.tid
        FROM participated 
        JOIN player ON participated.pid = player.pid 
        JOIN sports ON participated.sid = sports.sid 
        JOIN tournament ON participated.tid = tournament.tid";

// Check if HTTP_SPORT header is set
if (isset($_SERVER['HTTP_SPORT']) && $_SERVER['HTTP_SPORT'] !== "") {
    // Sanitize and use HTTP_SPORT value
    $sportName = mysqli_real_escape_string($connect, $_SERVER['HTTP_SPORT']);
    $sql .= " WHERE sports.sid LIKE CONCAT(?, '%')";
}

// Check if HTTP_EVTID header is set
if (isset($_SERVER['HTTP_EVTID']) && $_SERVER['HTTP_EVTID'] !== "") {
    // Sanitize and use HTTP_EVTID value
    if ($_SERVER['HTTP_EVTID'] !== "Events") {
        $eventName = mysqli_real_escape_string($connect, $_SERVER['HTTP_EVTID']);
        if (isset($sportName)) {
            $sql .= " AND tournament.tname = ?";
        } else {
            $sql .= " WHERE tournament.tname = ?";
        }
    }
}

if (isset($_SERVER['HTTP_ROLL']) && $_SERVER['HTTP_ROLL'] !== "") {
    $rollNo = mysqli_real_escape_string($connect, $_SERVER['HTTP_ROLL']);
    if (isset($evtName) || isset($sportName)) {
        $sql .= " AND participated.pid LIKE CONCAT(?, '%')";
    } else {
        $sql .= " WHERE participated.pid LIKE CONCAT(?, '%')";
    }
}

if (isset($_SERVER['HTTP_NAME']) && $_SERVER['HTTP_NAME'] !== "") {
    $name = mysqli_real_escape_string($connect, $_SERVER['HTTP_NAME']);
    if (isset($evtName) || isset($sportName) || isset($rollNo)) {
        $sql .= " AND player.pname LIKE CONCAT(?, '%')";
    } else {
        $sql .= " WHERE player.pname LIKE CONCAT(?, '%')";
    }
}

if (isset($_SERVER['HTTP_SORT']) && $_SERVER['HTTP_SORT'] !== "") {
    $sort = mysqli_real_escape_string($connect, $_SERVER['HTTP_SORT']);
    $sql .= " " . $sort;
}


// Prepare the SQL statement
$stmt = mysqli_prepare($connect, $sql);


    // Bind parameters if they are set
// Bind parameters if they are set
if (isset($sportName) && isset($eventName) && isset($rollNo) && isset($name)) {
    mysqli_stmt_bind_param($stmt, "ssss", $sportName, $eventName, $rollNo, $name);
} elseif (isset($sportName) && isset($eventName) && isset($rollNo)) {
    mysqli_stmt_bind_param($stmt, "sss", $sportName, $eventName, $rollNo);
} elseif (isset($sportName) && isset($eventName) && isset($name)) {
    mysqli_stmt_bind_param($stmt, "sss", $sportName, $eventName, $name);
} elseif (isset($sportName) && isset($rollNo) && isset($name)) {
    mysqli_stmt_bind_param($stmt, "sss", $sportName, $rollNo, $name);
} elseif (isset($eventName) && isset($rollNo) && isset($name)) {
    mysqli_stmt_bind_param($stmt, "sss", $eventName, $rollNo, $name);
} elseif (isset($sportName) && isset($eventName)) {
    mysqli_stmt_bind_param($stmt, "ss", $sportName, $eventName);
} elseif (isset($sportName) && isset($rollNo)) {
    mysqli_stmt_bind_param($stmt, "ss", $sportName, $rollNo);
} elseif (isset($sportName) && isset($name)) {
    mysqli_stmt_bind_param($stmt, "ss", $sportName, $name);
} elseif (isset($eventName) && isset($rollNo)) {
    mysqli_stmt_bind_param($stmt, "ss", $eventName, $rollNo);
} elseif (isset($eventName) && isset($name)) {
    mysqli_stmt_bind_param($stmt, "ss", $eventName, $name);
} elseif (isset($rollNo) && isset($name)) {
    mysqli_stmt_bind_param($stmt, "ss", $rollNo, $name);
} elseif (isset($sportName)) {
    mysqli_stmt_bind_param($stmt, "s", $sportName);
} elseif (isset($eventName)) {
    mysqli_stmt_bind_param($stmt, "s", $eventName);
} elseif (isset($rollNo)) {
    mysqli_stmt_bind_param($stmt, "s", $rollNo);
} elseif (isset($name)) {
    mysqli_stmt_bind_param($stmt, "s", $name);
}


    // Execute the statement
    mysqli_stmt_execute($stmt);

    // Get the result
    $result = mysqli_stmt_get_result($stmt);

    $json_array = array();
while ($row = mysqli_fetch_assoc($result)) {
    $json_array[] = $row;
}
echo json_encode($json_array);
