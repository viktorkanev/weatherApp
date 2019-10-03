const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = `https://api.darksky.net/forecast/a0eaf04ef54abf43290ce609c181cc48/${longitude},${latitude}?units=si`;

    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to fetch data', undefined)
        } else if (response.body.error) {
            callback(`Error: ${response.body.error}`, undefined)
        } else {
            callback(undefined, `${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature}C. There is a ${response.body.currently.precipProbability}% chance of rain.`);
        }

    });

}

module.exports = forecast