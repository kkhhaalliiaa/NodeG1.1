const request = require('postman-request');

const weather = (latitude, longitude, unit, callback) => {
  const url = `https://api.weatherstack.com/current?access_key=832decb7e5151e13e284f876b3f7c775&query=${latitude},${longitude}&units=${unit}`
  request({url: url, json: true}, (error, {body} = {}) =>{
    if(error){
      callback('Unable to connect to weather service', undefined)
    } else if(body.error){
      callback('Unable to find location. Try another location.', undefined)
    } 
    callback(undefined, `${body.current.weather_descriptions[0]}. The tempature is ${body.current.temperature} degrees. It feels like ${body.current.feelslike} degrees.`) 
  })
}
module.exports = weather;