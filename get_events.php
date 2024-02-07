<?php
// Database credentials
$servername = "localhost"; 
$username = "root";
$password = "";
$dbname = "calendar_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare SQL statement to retrieve events from the database
$sql = "SELECT * FROM events";
$result = $conn->query($sql);

// Check if any rows were returned
if ($result->num_rows > 0) {
    // Create an array to store events
    $events = array();

    // Fetch events from the database
    while ($row = $result->fetch_assoc()) {
        // Add each event to the events array
        $events[] = $row;
    }

    // Convert events array to JSON and output
    echo json_encode($events);
} else {
    echo "0 results";
}

// Close database connection
$conn->close();
?>
