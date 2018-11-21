const express = require('express');
const hbs = require('hbs');
const port = process.env.PORT || 8080;

var app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/pubic'));

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


app.get('/horoscope', (request, response) => {
    response.render('horoscope.hbs', {
        title: 'Main Page',
        sign: 'cancer',
        description: '123123123'
    });
});

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

