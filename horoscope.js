console.log("connected to horoscope.js");
const request = require("request");
var sign = "";

var getFortune = (sign, callback) => {
    request({
        url: `https://aztro.sameerkumar.website/?sign=${sign}&day=today`,
        json: true,
        method: "POST"
    }, (error, response, body) => {
        if (error) {
            callback("Cant connect to Horoscope Server");
        } else {
            console.log("horoscope connection successful");
            callback(body);
        }
    });
};

module.exports = {
    getFortune
};
