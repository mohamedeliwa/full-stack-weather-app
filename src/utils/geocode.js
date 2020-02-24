// npm package that allows us to create http requests.
const request = require("request");

const geoCode = (address, callback) => {
    
    // the url of the api we are using for geocoding, https://mapbox.com
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGlnZXYiLCJhIjoiY2s2Z2w5b28wMG5pMTNubWwwOTdlZ2cwaCJ9.8czn8-ba7sQMRqgn0E6u3w&limit=1`;
    request({
      url,
      json: true
    }, (error, response, body) => {
      if(error){
        callback("Can't connect to geolocation service")
      } else if (body.features.length === 0) {
        callback("Unable to find location, try again with different search term.")
      } else {
        callback(undefined, {
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
          location: body.features[0].place_name
        })
      }
    })
  }
  
 

module.exports = geoCode;