<?php

include_once("core.php");

$connect = mysqli_connect("localhost:3308", "root", "", "sports_management_system");

// Set the default SQL query
$sql = "SELECT sports.sname, participated.pid, player.pname, player.DOB, player.gender, player.mobile_no, player.email, sports.sid 
        FROM participated 
        JOIN player ON participated.pid = player.pid 
        JOIN sports ON participated.sid = sports.sid";

// Check if HTTP_EVTID header is set
if (isset($_SERVER['HTTP_EVTID']) && $_SERVER['HTTP_EVTID'] !== "") {
    // Sanitize and use HTTP_EVTID value
    $evtName = mysqli_real_escape_string($connect, $_SERVER['HTTP_EVTID']);
    $sql .= " WHERE participated.tid = ?";
}

// Check if HTTP_SPORT header is set
if (isset($_SERVER['HTTP_SPORT']) && $_SERVER['HTTP_SPORT'] !== "") {
    // Sanitize and use HTTP_SPORT value
    if ($_SERVER['HTTP_SPORT'] !== "Sports") {
        $sportName = mysqli_real_escape_string($connect, $_SERVER['HTTP_SPORT']);
        if (isset($evtName)) {
            $sql .= " AND sports.sname = ?";
        } else {
            $sql .= " WHERE sports.sname = ?";
        }
    }
}

// Check if HTTP_ROLL header is set
if (isset($_SERVER['HTTP_ROLL']) && $_SERVER['HTTP_ROLL'] !== "") {
    $rollNo = mysqli_real_escape_string($connect, $_SERVER['HTTP_ROLL']);
    if (isset($evtName) || isset($sportName)) {
        $sql .= " AND participated.pid LIKE CONCAT(?, '%')";
    } else {
        $sql .= " WHERE participated.pid LIKE CONCAT(?, '%')";
    }
}

// Check if HTTP_NAME header is set
if (isset($_SERVER['HTTP_NAME']) && $_SERVER['HTTP_NAME'] !== "") {
    $name = mysqli_real_escape_string($connect, $_SERVER['HTTP_NAME']);
    if (isset($evtName) || isset($sportName) || isset($rollNo)) {
        $sql .= " AND player.pname LIKE CONCAT(?, '%')";
    } else {
        $sql .= " WHERE player.pname LIKE CONCAT(?, '%')";
    }
}

// Check if HTTP_SORT header is set
if (isset($_SERVER['HTTP_SORT']) && $_SERVER['HTTP_SORT'] !== "") {
    $sort = mysqli_real_escape_string($connect, $_SERVER['HTTP_SORT']);
    $sql .= " " . $sort;
}

// Prepare the SQL statement
$stmt = mysqli_prepare($connect, $sql);

// Bind parameters
if (isset($evtName) && isset($sportName) && isset($rollNo) && isset($name)) {
    mysqli_stmt_bind_param($stmt, 'ssss', $evtName, $sportName, $rollNo, $name);
} elseif (isset($evtName) && isset($sportName) && isset($rollNo)) {
    mysqli_stmt_bind_param($stmt, 'sss', $evtName, $sportName, $rollNo);
} elseif (isset($evtName) && isset($sportName) && isset($name)) {
    mysqli_stmt_bind_param($stmt, 'sss', $evtName, $sportName, $name);
} elseif (isset($evtName) && isset($rollNo) && isset($name)) {
    mysqli_stmt_bind_param($stmt, 'sss', $evtName, $rollNo, $name);
} elseif (isset($sportName) && isset($rollNo) && isset($name)) {
    mysqli_stmt_bind_param($stmt, 'sss', $sportName, $rollNo, $name);
} elseif (isset($evtName) && isset($sportName)) {
    mysqli_stmt_bind_param($stmt, 'ss', $evtName, $sportName);
} elseif (isset($evtName) && isset($rollNo)) {
    mysqli_stmt_bind_param($stmt, 'ss', $evtName, $rollNo);
} elseif (isset($evtName) && isset($name)) {
    mysqli_stmt_bind_param($stmt, 'ss', $evtName, $name);
} elseif (isset($sportName) && isset($rollNo)) {
    mysqli_stmt_bind_param($stmt, 'ss', $sportName, $rollNo);
} elseif (isset($sportName) && isset($name)) {
    mysqli_stmt_bind_param($stmt, 'ss', $sportName, $name);
} elseif (isset($rollNo) && isset($name)) {
    mysqli_stmt_bind_param($stmt, 'ss', $rollNo, $name);
} elseif (isset($evtName)) {
    mysqli_stmt_bind_param($stmt, 's', $evtName);
} elseif (isset($sportName)) {
    mysqli_stmt_bind_param($stmt, 's', $sportName);
} elseif (isset($rollNo)) {
    mysqli_stmt_bind_param($stmt, 's', $rollNo);
} elseif (isset($name)) {
    mysqli_stmt_bind_param($stmt, 's', $name);
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
