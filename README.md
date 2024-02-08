# Calendar App README

Welcome to the Calendar App repository! This application allows users to manage events and sub-events on selected dates. The calendar interface displays events as green strips and sub-events as blue strips on the respective dates. This document provides an overview of the application features, technologies used, and instructions for setup.

## Features

1. **Event Management**:
   - Users can add events to selected or clicked dates.
   - Events are displayed as green strips on the date grid.
   - Events can be saved to the database for persistence.

2. **Sub-Event Management**:
   - Users can add sub-events to existing events by clicking on the green strips.
   - Sub-events are displayed as blue strips under their parent events in the date grid.
   - Sub-events can be saved to the database for persistence.

3. **Database Integration**:
   - MySQL database is used to store event and sub-event data.
   - PHP scripts handle database operations such as saving events and sub-events.

## Technologies Used

- HTML: Markup language for creating the structure of web pages.
- CSS: Styling language for designing the appearance of web pages.
- JavaScript (jQuery): Used for dynamic interactions and DOM manipulation.
- Bootstrap: Front-end framework for responsive and mobile-first design.
- MySQL: Relational database management system for storing event and sub-event data.
- PHP: Server-side scripting language for handling database operations.
- phpMyAdmin: Web-based administration tool for managing MySQL databases.

## Setup Instructions

1. **Clone the Repository**:
   ```
   git clone https://github.com/sarojsuraj52/calender.git
   ```

2. **Database Setup**:
   - Set up a MySQL database using phpMyAdmin or any other MySQL management tool.
   - Import the provided SQL schema file (`database_schema.sql`) to create the necessary tables for the application.

3. **Configuration**:
   - Update the database connection settings in the PHP scripts (`get_events.php`, `save_event.php`, `save_sub_event.php`) to match your database credentials.

4. **Deployment**:
   - Deploy the application on a web server with PHP support.

5. **Accessing the Application**:
   - Open the deployed application in a web browser to access the calendar interface.
   - Click on dates to add events.
   - Click on green strips to add sub-events to existing events.

6. **Usage**:
   - Navigate through months using the navigation buttons to view events and sub-events across different months.
   - Events and sub-events are dynamically loaded from the database based on the selected month and year.

## Contributors

- Saroj Suraj <sarojsuraj52@example.com>

Feel free to contribute to this project by submitting bug reports, feature requests, or pull requests. Thank you for using the Calendar App!
