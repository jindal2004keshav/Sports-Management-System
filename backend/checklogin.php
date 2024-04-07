<?php

// Include necessary files
include_once("core.php");

// Database connection parameters
$host = "localhost";
$port = "3308";
$username = "root";
$password = "";
$database = "sports_management_system";


// Establish database connection
$connect = mysqli_connect("$host:$port", $username, $password, $database);
if (!$connect) {
    die("Connection failed: " . mysqli_connect_error());
}

// $sql = "SELECT * FROM users WHERE email = 'k@iiitg.ac.in'";
// $stmt = mysqli_prepare($connect, $sql);
// if (mysqli_stmt_execute($stmt)) {
//     $result = mysqli_stmt_get_result($stmt);
//     $json_array = [];
//     while ($row = mysqli_fetch_assoc($result)) {
//         $json_array[] = $row;
//     }
//     echo json_encode($json_array);
// }

// Check if email is provided in the HTTP headers
if (isset($_SERVER['HTTP_EMAIL']) && !empty($_SERVER['HTTP_EMAIL'])) {
    $email = $_SERVER['HTTP_EMAIL'];

    // Prepare SQL statement
    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = mysqli_prepare($connect, $sql);

    if ($stmt) {
        // Bind parameter
        mysqli_stmt_bind_param($stmt, "s", $email);

        // Execute query
        if (mysqli_stmt_execute($stmt)) {
            // Get result
            $result = mysqli_stmt_get_result($stmt);

            // Fetch data into an array
            $json_array = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $json_array[] = $row;
            }

            // Output JSON
            echo json_encode($json_array);
        } else {
            // Query execution failed
            echo "Query execution failed";
        }

        // Close statement
        mysqli_stmt_close($stmt);
    } else {
        // Statement preparation failed
        echo "Statement preparation failed";
    }
} else {
    // Email not provided in HTTP headers
    echo "Email not provided";
}

// Close database connection
mysqli_close($connect);
