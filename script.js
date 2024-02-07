$(document).ready(function () {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth();
    var daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    updateCalendar(currentYear, currentMonth);
  
    // Event Handlers for Navigation Buttons
    $("#prevYear").click(function () {
      currentYear--;
      updateCalendar(currentYear, currentMonth);
    });
  
    $("#nextYear").click(function () {
      currentYear++;
      updateCalendar(currentYear, currentMonth);
    });
  
    $("#prevMonth").click(function () {
      if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
      } else {
        currentMonth--;
      }
      updateCalendarWithEvents(currentYear, currentMonth);
      fetchSubEvents()
      updateCalendar(currentYear, currentMonth);
    });
  
    $("#nextMonth").click(function () {
      if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
      } else {
        currentMonth++;
      }
      updateCalendarWithEvents(currentYear, currentMonth);
      fetchSubEvents()
      updateCalendar(currentYear, currentMonth);
    });


// Function to update the calendar grid with events from fetch
function updateCalendarWithEvents(year, month) {
  // Clear the calendar grid before adding events
  $(".calendar-grid-item").removeClass("has-event").find(".event-title").remove();

  // AJAX request to retrieve events from the PHP script
  $.ajax({
      type: "POST",
      url: "get_events.php",
      data: { year: year, month: month + 1 }, // Pass year and month parameters (month + 1 because JavaScript months are zero-indexed)
      dataType: "json",
      success: function (events) {
          // Process the events received from the server
          console.log(events);
          // Loop through each event
          events.forEach(function(event) {
              var eventDate = new Date(event.clicked_date); // Convert clicked_date to Date object
              var eventMonth = eventDate.getMonth(); // Get month from eventDate
              var eventYear = eventDate.getFullYear(); // Get year from eventDate
              var eventDay = eventDate.getDate(); // Get day from eventDate
              
              // Check if the event month and year match the current month and year
              if (eventMonth === month && eventYear === year) {
                  // Add the event title to the calendar grid only if it's in the current month and year
                  addEventToCalendar(eventDay, event.title, event.id);
              }
          });
      },
      error: function (xhr, status, error) {
          console.error("Error fetching events:", error);
      }
  });
}

// Call the function to update the calendar grid with events
updateCalendarWithEvents(currentYear, currentMonth);

// Function to fetch sub-events data from the database
function fetchSubEvents() {
  $.ajax({
      type: "GET",
      url: "fetch_sub_events.php",
      dataType: "json",
      success: function (subEvents) {
          console.log('sub event', subEvents); // Log the fetched sub-events data in the console
          // Loop through the subEvents array
          subEvents.forEach(function (subEvent) {
              var eventId = subEvent.event_id;
              var subEventTitle = subEvent.sub_event_title;
              // Add the sub-event to the calendar grid
              addSubEventToCalendar(eventId, subEventTitle);
          });
      },
      error: function (xhr, status, error) {
          console.error("Error fetching sub-events:", error);
      }
  });
}

fetchSubEvents();
  
// Event Handler for clicking on a date
$(document).on("click", ".calendar-grid-item", function () {
  var day = $(this).text();
  $("#eventModal").modal("show");
  $("#eventForm").off("submit").submit(function (event) {
      event.preventDefault();
      var title = $("#eventTitle").val();
      var description = $("#eventDescription").val();
      
      // AJAX request to submit form data to PHP script
      $.ajax({
          type: "POST",
          url: "save_event.php",
          data: { eventTitle: title, 
            eventDescription: description, 
            clickedDate : currentYear + '-' + 
                  ('0' + (currentMonth + 1)).slice(-2) + '-' + 
                  ('0' + day).slice(-2)
          },
          success: function (response) {
              alert(response); // Display response from PHP script
              addEventToCalendar(day, title); // Add event to calendar
              $("#eventModal").modal("hide"); // Hide modal
              // Clear form inputs
              $("#eventTitle").val('');
              $("#eventDescription").val('');
          }
      });
  });
});

  
// Function to add event to the calendar grid
function addEventToCalendar(day, title, eventId) {
  $(".calendar-grid-item").each(function () {
      if ($(this).text() == day) {
          // Check if the calendar grid item does not have the text-muted class
          if (!$(this).hasClass("text-muted")) {
              // Add has-event class and append the event title with data-event-id attribute
              $(this).addClass("has-event").append("<div class='event-title' data-event-id='" + eventId + "'>" + title + "</div>");
          }
      }
  });
}
  
// Function to update the calendar grid
function updateCalendar(year, month) {
    var firstDay = new Date(year, month, 1).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate(); // Calculate days in current month
    var prevMonthDays = new Date(year, month, 0).getDate();
    var calendarHTML = "";
    $("#currentMonthYear").text(getMonthName(month) + " " + year);
    for (var i = 0; i < firstDay; i++) {
      calendarHTML += "<div class='calendar-grid-item text-muted'>" + (prevMonthDays - firstDay + i + 1) + "</div>";
    }
  
    for (var j = 1; j <= daysInMonth; j++) {
      if (j === currentDate.getDate() && year === currentDate.getFullYear() && month === currentDate.getMonth()) {
        calendarHTML += "<div class='calendar-grid-item font-weight-bold'>" + j + "</div>";
      } else {
        calendarHTML += "<div class='calendar-grid-item'>" + j + "</div>";
      }
    }
  
    $(".calendar-grid").html(calendarHTML);
  }
  
  
    // Function to get the name of the month
    function getMonthName(monthIndex) {
      var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
      return monthNames[monthIndex];
    }

    $(document).on("click", ".event-title", function (event) {
      event.stopPropagation(); // Stop event propagation to prevent opening main modal
      var title = $(this).text();
      $("#subEventModal").modal("show");
      $("#subEventForm").off("submit").submit(function (event) {
          event.preventDefault();
          var subEventTitle = $("#subEventTitle").val();
          saveSubEventToDatabase(title, subEventTitle); // Save sub-event to the database
          $("#subEventModal").modal("hide");
          // Clear form inputs
          $("#subEventTitle").val('');
      });
  });
  
  // Function to save sub-event to the database
  function saveSubEventToDatabase(title, subEventTitle) {
      $.ajax({
          type: "POST",
          url: "save_sub_event.php", // URL to your PHP script for saving sub-events
          data: { eventTitle: title, subEventTitle: subEventTitle },
          success: function (response) {
              if (response.trim() === "Sub-event saved successfully") {
                  addSubEventToCalendar(title, subEventTitle); // Add sub-event to the calendar upon successful saving
              } else {
                  console.error("Error saving sub-event:", response);
              }
          },
          error: function (xhr, status, error) {
              console.error("Error saving sub-event:", error);
          }
      });
  }
  
      // Function to add sub-event to the calendar grid
      function addSubEventToCalendar(identifier, subEventTitle) {
        // Check if the identifier is an event title or an event ID
        var $eventTitles;
        if (isNaN(identifier)) {
            // Find the main event with the given title
            $eventTitles = $(".event-title").filter(function() {
                return $(this).text() === identifier;
            });
        } else {
            // Find the event title div with the given event ID
            $eventTitles = $(".event-title[data-event-id='" + identifier + "']");
        }

        // Loop through each event title found
        $eventTitles.each(function () {
            // Create a sub-event div and append it below the main event
            var subEventHTML = "<div class='sub-event'>" + subEventTitle + "</div>";
            $(this).parent().append(subEventHTML);
            // Adjust CSS to differentiate sub-events
            $(this).parent().children(".sub-event").last().addClass("sub-event-style");
        });
      }


  });
  