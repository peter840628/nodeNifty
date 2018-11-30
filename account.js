console.log("connected to account.js");
const fs = require("fs");
const sign = require("./sign");

var database = fs.readFileSync("database.json");
var existedAcc = JSON.parse(database);

module.exports.newAccount = (account, password, birthday) => {
    var userSign = sign.getSign(birthday);
    var newAccount = {
        "username": account,
        "password": password,
        "sign": userSign,
        "token": Math.random().toString(16).slice(2, 16)
    };

    var isExist = false;
    for (var i = 0; i < existedAcc.length; i++) {
        if (existedAcc[i].username === account) {
            console.log("Account name exists");
            isExist = true;
            break;
        }
    }
    if (isExist === false) {
        existedAcc.push(newAccount);
        var result = JSON.stringify(existedAcc);
        fs.writeFileSync("database.json", result);
        console.log("\nNew User added into system!\n");
        console.log(`Username: ${newAccount.username}`);
        console.log(`Password: ${newAccount.password}`);
        console.log(`Sign: ${newAccount.sign}`);
        return newAccount.token;
    }
    return false;
};

module.exports.Login = (username, password) => {
    console.log(existedAcc);
    for (var i = 0; i < existedAcc.length; i++) {
        if (existedAcc[i].username === username) {
            if (existedAcc[i].password === password)
            {
                return existedAcc[i].token;
            } else {
                console.log("wrong password");
            }
        }
    }
    return false;
};

module.exports.getSign = (username) =>
{
    for (var i = 0; i < existedAcc.length; i++)
    {
        if (existedAcc[i].username === username)
        {
            return existedAcc[i].sign;
        }
    }
    return false;
};

module.exports.getSignByToken = (token) =>
{
    for (var i = 0; i < existedAcc.length; i++)
    {
        if (existedAcc[i].token === token)
        {
            return existedAcc[i].sign;
        }
    }
    return false;
};
