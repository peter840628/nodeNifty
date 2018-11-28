const fs = require('fs');

var database = fs.readFileSync('database.json');
var existedAcc = JSON.parse(database);
var account = {};


module.exports.newAccount = (account, password, birthday) => {


    var newAccount = {
        "username": account,
        "password": password,
        "birthday": birthday
    };

    var isExist = false;

    for (i = 0; i < existedAcc.length; i++) {
        if (existedAcc[i].username === account) {
            console.log('Account name exists');
            isExist=true;
            break
        }
    }
    if (isExist === false){
            existedAcc.push(newAccount);
            var result = JSON.stringify(existedAcc);
            fs.writeFileSync('database.json', result);
            console.log('\nNew User added into system!\n');
            console.log('Username: ' + newAccount.username);
            console.log('Password: ' + newAccount.password);
            console.log('Birthday: ' + newAccount.birthday);}
};


module.exports.Login = (username, password) => {

    var accountValid = false;
    var passwordValid = false;
    console.log(existedAcc)
    for (i = 0; i < existedAcc.length; i++) {
        if (existedAcc[i].account === username) {
            var accountValid = true;
            if (existedAcc[i].password === password) {
                var passwordValid = true;
            } else {
                console.log("wrong password");
            }
        }
        // } else {
        //     console.log("wrong username");
        // }
    }

};
