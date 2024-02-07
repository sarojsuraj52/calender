<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve event title, sub-event title, and event ID from POST data
    $eventTitle = $_POST["eventTitle"];
    $subEventTitle = $_POST["subEventTitle"];

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

    // Get the event ID based on the event title
    $sql_get_event_id = "SELECT id FROM events WHERE title = ?";
    $stmt_get_event_id = $conn->prepare($sql_get_event_id);
    $stmt_get_event_id->bind_param("s", $eventTitle);
    $stmt_get_event_id->execute();
    $result_event_id = $stmt_get_event_id->get_result();
    $row_event_id = $result_event_id->fetch_assoc();
    $eventId = $row_event_id['id'];
    $stmt_get_event_id->close();

    // Prepare SQL statement to insert sub-event data into the database
    $sql = "INSERT INTO sub_events (event_id, event_title, sub_event_title) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iss", $eventId, $eventTitle, $subEventTitle);

    if ($stmt->execute() === TRUE) {
        echo "Sub-event saved successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Close database connection
    $stmt->close();
    $conn->close();
}
?>
