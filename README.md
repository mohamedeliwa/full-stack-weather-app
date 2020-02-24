# full-stack-weather-app
a full-stack weather application built using nodejs.  
It allows the user to get forecast information for a specific location.  
Link to [Home Page](https://full-stack-weather-app.herokuapp.com/)  

How it Works:
- The user provides the location through form input in the browser.
- Then the frontend passes the location to the server using query strings.
- Then the server handles the location to backend function that uses an API to convert the provided location to latitude and longitude
- Then uses an other API to get the forecast information by providing it these latitiude and longitude.
- Then the server sends the forecast data back to the browser which in turn displays it to the user.  

Packages I used to build this project:
- "express" for the server.
- "hbs" as the template engine.
- "request" to make http requests.
