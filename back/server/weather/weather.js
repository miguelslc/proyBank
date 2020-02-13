const request = require("request");

module.exports = class OpenWeatherMap {

    constructor(config) {
        this.config = config;
    }

    getCurrentWeatherByCityName(cityName, callback) {
        request.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${this.config.units}&APPID=${this.config.APPID}`,
            (err, data) => {
                this.parseResponse(err, data, callback);
            })
    };

    getCurrentWeatherByCityID(cityId, callback) {
        request.get(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=${this.config.units}&APPID=${this.config.APPID}`,
            (err, data) => {
                this.parseResponse(err, data, callback);
            })
    };

    parseResponse(err, data, callback) {
        var error = null;
        var response = null;

        error = err;
        if (data) {
            if (data.statusCode != 200) {
                var e = JSON.parse(data.body)
                error = new Error(e.message);
                error.status = e.cod;
            }
            if (data.body) {
                response = JSON.parse(data.body);
            }
        }

        callback(error, response);
    }

}