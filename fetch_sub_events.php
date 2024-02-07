<?php
// Perform database connection
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

// Prepare SQL statement to fetch sub-events from the database
$sql = "SELECT * FROM sub_events";

$result = $conn->query($sql);

$subEvents = array(); // Array to store sub-events

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Push each row (sub-event) into the subEvents array
        array_push($subEvents, $row);
    }
}

// Close database connection
$conn->close();

// Convert the array to JSON format
$subEventsJson = json_encode($subEvents);

// Return the JSON data
echo $subEventsJson;
?>
