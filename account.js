console.log('connected to account.js');
const fs = require('fs');
const sign = require('./sign')

var database = fs.readFileSync('database.json');
var existedAcc = JSON.parse(database);
var account = {};


module.exports.newAccount = (account, password, birthday) => {

    userSign = sign.getSign(birthday);
    var newAccount = {
        "username": account,
        "password": password,
        "sign": userSign
    };

    var isExist = false;

    for (i = 0; i < existedAcc.length; i++) {
        if (existedAcc[i].username === account) {
            console.log('Account name exists');
            isExist = true;
            break
        }
    }
    if (isExist === false) {
        existedAcc.push(newAccount);
        var result = JSON.stringify(existedAcc);
        fs.writeFileSync('database.json', result);
        console.log('\nNew User added into system!\n');
        console.log('Username: ' + newAccount.username);
        console.log('Password: ' + newAccount.password);
        console.log('Sign: ' + newAccount.sign);
    }
};


module.exports.Login = (username, password) => {

    var accountValid = false;
    var passwordValid = false;
    console.log(existedAcc)
    for (i = 0; i < existedAcc.length; i++) {

        if (existedAcc[i].username === username) {
            var accountValid = true;
            if (existedAcc[i].password === password) {
                var passwordValid = true;
            } else {
                console.log("wrong password");
            }
        }

    }

};

module.exports.getSign = (username) => {

    for (i = 0; i < existedAcc.length; i++) {

        if (existedAcc[i].username === username) {
            return existedAcc[i].sign;
            console.log(existedAcc[i].sign);
        }
    }

};



