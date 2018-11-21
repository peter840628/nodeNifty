const fs = require('fs');

var database = fs.readFileSync('database.json');
var existedAcc = JSON.parse(database);
var account = {};




module.exports.newAccount = (account, password, birthday) => {



    account.username = account;
    account.password = password;
    account.birthday = birthday;


    existedAcc.push(account);

    var result = JSON.stringify(existedAcc);

    fs.writeFileSync('database.json', result);

    console.log('\nNew User added into system!\n');

    console.log('Username: ' + account.username);
    console.log('Password: ' + account.password);
    console.log('Birthday: ' + account.birthday);
};


module.exports.Login = (username, password) => {

    var accountValid = false;
    var passwordValid = false;

    for (i = 0; i < existedAcc.length; i++) {
        if (existedAcc[i].account === username) {
            var accountValid = true;

            if (existedAcc[i].password === password) {
                var passwordValid = true;
            } else {
                console.log("wrong password");
            }
        } else {
            console.log("wrong username");
        }
    }

};
