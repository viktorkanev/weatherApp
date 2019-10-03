const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidmlrdG9ya2FuZXYiLCJhIjoiY2sxN3dvd25tMWdrZzNvdGdsOW9mamF5cSJ9.m1LirDstOXCimqg63tcWjQ&limit=1`;

    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to fetch data', undefined);
        } else if (response.body.features.length === 0) {
            callback('Could not find a matching city', undefined);
        } else {
            callback(undefined, {
                longitude: response.body.features[0].center[1],
                latitude: response.body.features[0].center[0],
                city: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode