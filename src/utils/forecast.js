const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/73991b479adb1d0fcbae1a809d66ae0f/'+latitude+','+ longitude +'?units=si'
    request({url, json : true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services!', data)
        } else if (body.error){
            callback('Unable to find location!',undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' in degrees celcius outside. There is a ' + body.currently.precipProbability + '% chance of rain.' + 'Wind speeds are ' + body.currently.windSpeed+ ' kph, and visibility is ' + body.currently.visibility + ' km.') 
        }
    })
}

module.exports = forecast