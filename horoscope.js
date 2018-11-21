var request = require('request');

var sign = 'cancer';

request({
    url: `https://aztro.sameerkumar.website/?sign=${sign}&day=today`,
    json: true,
    method: 'POST'
}, (error, response, body) => {
    if (error) {
        console.log('Cant connect to Horoscope Server');
    } else {
        console.log(`Birthday range for your horoscope sign, ${sign} is ${body.date_range}`);
        console.log('\n' + body.description);
        console.log(body);
    }
});
