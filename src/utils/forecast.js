const request = require('request')

const forecast = (latitude, longitude, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=da69ae604322ca0c5b6ad961cb2e8084&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true}, (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect to weather service', undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                forecast: body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + '°F.'
            })
        }
    })
}

module.exports = forecast

