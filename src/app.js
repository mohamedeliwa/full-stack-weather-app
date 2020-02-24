const path = require("path");
const express = require("express");
// requiring hbs is not necessary in case we are using views only
// but we need to require it if we are gonna use partials
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = 3000;

// Getting the absolute path to public folder
const puplicDirectoryPath = path.join(__dirname, "../public");
// Getting the absolute path to views folder.
const viewsPath = path.join(__dirname, "./templates/views");
// Getting the absolute path to partials folder
const partialsPath = path.join(__dirname, "./templates/partials");

// setting our app view engine to hbs engine
app.set("view engine", "hbs");
// By defaut hbs searches for a folder named views in src folder.
// But as the location has changed.
// Setting the views folder of our app to the new location.
app.set("views", viewsPath);
// Setting partials folder for hbs
hbs.registerPartials(partialsPath);

// Serving public folder as static assets
app.use(express.static(puplicDirectoryPath));

// Serving index.hbs file as a template engine file as our home page
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Jhon Deo"
  });
});

// Serving about.hbs file as a template engine file as our about page
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Jhon Deo"
  });
});

// Serving help.hbs file as a template engine file as our help page
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    msg: "you don't need help, you're strong enough..!",
    name: "Jhon Deo"
  });
});

// Setting up Weather API to get the forecast for a location provided by a query
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "You must provide an address!"
    });
  } else {
    // passing the location to geoCode function to get latitude and logitude.
    geoCode(req.query.address, (geoError, geoResponse) => {
      // checking if error occured with geocode request
      if (geoError) {
        res.send({
          error: geoError
        });
      } else {
        // passing the geocoded location to forecast function to get the forecast.
        forecast(
          geoResponse.latitude,
          geoResponse.longitude,
          (castError, castResponse) => {
            // checking if error occured with forecast request
            if (castError) {
              res.send({
                error: castError
              });
            } else {
              // sending the forecast to the browser
              res.send({
                forecast: castResponse,
                location: geoResponse.location,
                address: req.query.address
              });
            }
          }
        );
      }
    });
  }
});

// app.get("/products", (req, res) => {
//   if (!req.query.search) {
//     res.send({
//       error: "You must provide a search term"
//     });
//   } else {
//     res.send({
//       products: [req.query]
//     });
//   }
// });

// more specific 404 page
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Article Not Found",
    msg: "Help artcle not found",
    name: "Jhon Deo"
  });
});
// Using "*" as a wild card character
// to match every route that is not matched in above routes.
// that is why this needs to come last
// Setting up 404 page route
app.get("*", (req, res) => {
  res.render("404", {
    title: "Page Not Found",
    msg: "Page not found",
    name: "Jhon Deo"
  });
});

app.listen(port, () => console.log(`app is listening on port ${port}!`));
