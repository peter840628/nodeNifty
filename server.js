const express = require('express');
const hbs = require('hbs');
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const accountFunctions = require('./account');
const request = require('request');
const horo = require('./horoscope');

var app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/views/stylesheets'));

hbs.registerPartials(__dirname + '/views/partials');


app.get('/', (request, response) => {
    response.render('login.hbs', {
        title: 'Login Page'
    });
});

app.use((request, response, next) => {
    var time = new Date().toString();
    console.log(`${time}:${request.method} ${request.url}`);
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/login', (request, response) => {
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

app.get('/login', (request, response) => {
    response.render('login.hbs', {
        title: 'Login Page'
    });
});


app.listen(port, () => {
    console.log(`server is running on ${port}`);
});

