const request = require('postman-request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${address}&access_token=pk.eyJ1IjoiY2hhbW5wIiwiYSI6ImNtNGhib2lsZjA1ZzEybHB5Z3dzaGZ2c2EifQ.UngPul8CXEJbMy5Dwr8ybg&limit=1`;

  request({ url: url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to location service');
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search.');
    } else {
      callback(undefined, {
        latitude: body.features[0].geometry.coordinates[1], 
        longitude: body.features[0].geometry.coordinates[0], 
        location: body.features[0].properties.full_address
      });
    }
  });
};

module.exports = geocode;