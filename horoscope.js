const request = require('request');

var getFortune = (sign, callback) => {

    var sign = 'Cancer';

    request({
        url: `https://aztro.sameerkumar.website/?sign=${sign}&day=today`,
        json: true,
        method: 'POST'
    }, (error, response, body) => {
        if (error) {
            callback('Cant connect to Horoscope Server');
        } else {
            console.log('horoscope connection successful');
            callback(body);
        }
    });
}


module.exports = {
    getFortune
}