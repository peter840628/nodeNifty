const express = require("express");
var cookieParser = require("cookie-parser");
const hbs = require("hbs");
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const accountFunctions = require("./account");
const request = require("request");
const horo = require("./horoscope");
const https = require("https");

var app = express();

app.set("view engine", "hbs");
app.use(cookieParser());
app.use(express.static(__dirname + "/views/stylesheets"));
hbs.registerPartials(__dirname + "/views/partials");

app.use((request, response, next) =>
{
    var time = new Date().toString();
    console.log(`${time}:${request.method} ${request.url}`);
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post("/login", (request, response) =>
{
    var accountName = request.body.username;
    var password = request.body.password;
    var token = accountFunctions.Login(accountName, password);
    if (token !== false)
    {
        response.cookie("token", token);
        var userSign = accountFunctions.getSign(accountName);
        console.log(accountName, password, userSign);

        horo.getFortune(userSign, (result) =>
        {
            response.render("horoscope.hbs", {
                title: "Main Page",
                sign: userSign,
                date_range: result.date_range,
                description: result.description,
            });
        });
    }
});

app.post("/register", (request, response) =>
{
    var accountName = request.body.username;
    var password = request.body.password;
    var birthday = request.body.birthday;
    console.log(accountName, password, birthday);

    var token = accountFunctions.newAccount(accountName, password, birthday);
    if (token !== false)
    {
        response.cookie("token", token);
    }
    response.render("placeholder_page.hbs");
});

app.get("/search", (request, response) =>
{
    var token = request.cookies.token;
    if (token === undefined)
    {
        return;
    }
    https.get({
        hostname: "api.cognitive.microsoft.com",
        path: `/bing/v7.0/search?q=${encodeURIComponent(accountFunctions.getSignByToken(token) + " horoscope online store")}`,
        headers: { 'Ocp-Apim-Subscription-Key': "fa4900c4123d4cc29e00561fa4991cb1" }
    }, res =>
    {
        let body = "";
        res.on("data", part => body += part);
        res.on("end", () =>
        {
            for (var header in res.headers)
            {
                if (header.startsWith("bingapis-") || header.startsWith("x-msedge-"))
                {
                    console.log(header + ": " + res.headers[header]);
                }
            }
            console.log("\nJSON Response:\n");
            // console.dir(JSON.parse(body), { colors: false, depth: null })
            var content = JSON.parse(body).webPages.value;
            console.log(content);
            response.render("search.hbs", {
                title: "Search Page",
                results: JSON.stringify(content)
            });
        });
        res.on("error", e =>
        {
            console.log(`Error: ${e.message}`);
            throw e;
        });
    });
});

app.get("/logout", (request, response) =>
{
    response.cookie("token", "");
    response.render("register.hbs", {
        title: "Register Page"
    });
});

app.get("/register", (request, response) =>
{
    response.render("register.hbs", {
        title: "Register Page"
    });
});

app.get("/", (request, response) =>
{
    var token = request.cookies.token;
    if (token !== undefined)
    {
        var userSign = accountFunctions.getSignByToken(token);
        if (userSign === false)
        {
            response.render("login.hbs", {
                title: "Login Page"
            });
        }
        horo.getFortune(userSign, (result) =>
        {
            response.render("horoscope.hbs", {
                title: "Main Page",
                sign: userSign,
                date_range: result.date_range,
                description: result.description
            });
        });
    }
    else
    {
        response.render("login.hbs", {
            title: "Login Page"
        });
    }
});

app.listen(port, () =>
{
    console.log(`server is running on ${port}`);
});
