<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $title = $_POST["eventTitle"];
    $description = $_POST["eventDescription"];
    $clickedDate = $_POST["clickedDate"];

    // Convert clicked date to MySQL date format
    $formattedDate = date('Y-m-d', strtotime($clickedDate));

    // Perform database connection
    $servername = "localhost"; // Change this if your database is hosted elsewhere
    $username = "root";
    $password = "";
    $dbname = "calendar_db";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare SQL statement to insert data into the database
    $sql = "INSERT INTO events (title, description, clicked_date) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $title, $description, $formattedDate);

    if ($stmt->execute() === TRUE) {
        echo "Event saved successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Close database connection
    $stmt->close();
    $conn->close();
}
?>
