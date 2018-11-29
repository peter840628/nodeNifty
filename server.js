const express = require('express');
const hbs = require('hbs');
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const accountFunctions = require('./account');
const request = require('request');
const horo = require('./horoscope');
const https = require('https');

var app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/views/stylesheets'));

hbs.registerPartials(__dirname + '/views/partials');


// app.get('/', (request, response) => {
//     response.render('login.hbs', {
//         title: 'Login Page'
//     });
// });

app.use((request, response, next) => {
    var time = new Date().toString();
    console.log(`${time}:${request.method} ${request.url}`);
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/', (request, response) => {
    var accountName = request.body.username;
    var password = request.body.password;


    accountFunctions.Login(accountName, password);

    var userSign = accountFunctions.getSign(accountName);
    console.log(accountName, password, userSign);

    horo.getFortune(userSign, (result) => {
        response.render('horoscope.hbs', {
            title: 'Main Page',
            sign: userSign,
            date_range: result.date_range,
            description: result.description,
        });
    });
});

app.post('/register', (request, response) => {
    var accountName = request.body.username;
    var password = request.body.password;
    var birthday = request.body.birthday;
    console.log(accountName, password, birthday);

    accountFunctions.newAccount(accountName, password, birthday);
    response.render('placeholder_page.hbs');
})


// app.get('/horoscope', (request, response) => {

//     var sign = 'cancer';

//     horo.getFortune(sign, (result) => {
//         response.render('horoscope.hbs', {
//             title: 'Main Page',
//             sign: sign,
//             date_range: result.date_range,
//             description: result.description,

//         });
//     });

// });

app.get('/register', (request, response) => {
    response.render('register.hbs', {
        title: 'Register Page'
    });
});

app.get('/', (request, response) => {
    response.render('login.hbs', {
        title: 'Login Page'
    });
});

app.get('/search/:scope', (request, response) => {

    https.get({
    hostname: 'api.cognitive.microsoft.com',
    path:     '/bing/v7.0/search?q=' + encodeURIComponent(request.params.scope + ' horoscope online store'),
    headers:  { 'Ocp-Apim-Subscription-Key': 'fa4900c4123d4cc29e00561fa4991cb1' },
  }, res => {
    let body = ''
    res.on('data', part => body += part)
    res.on('end', () => {
      for (var header in res.headers) {
        if (header.startsWith("bingapis-") || header.startsWith("x-msedge-")) {
          console.log(header + ": " + res.headers[header])
        }
      }
      console.log('\nJSON Response:\n')
      // console.dir(JSON.parse(body), { colors: false, depth: null })
      var content = JSON.parse(body).webPages.value;
      console.log(content);
   
    response.render("search.hbs", {
        title: "Search Page",
        results: JSON.stringify(content)
    });
    })
    res.on('error', e => {
      console.log('Error: ' + e.message)
      throw e
    })
  });
});


app.listen(port, () => {
    console.log(`server is running on ${port}`);
});

