console.log('connected to sign.js');

var birthday = "1995-06-08";

var getSign = (birthday) => {

    var bday = Date.parse(birthday.slice(5, 10));

    var aquarius = Date.parse("1-20");
    var pisces = Date.parse("2-18");
    var aries = Date.parse("3-20");
    var taurus = Date.parse("4-20");
    var gemini = Date.parse("5-21");
    var cancer = Date.parse("6-21");
    var leo = Date.parse("7-23");
    var virgo = Date.parse("8-23");
    var libra = Date.parse("9-23");
    var scopio = Date.parse("10-23");
    var sagittarius = Date.parse("11-22");
    var capricorn = Date.parse("12-22");


    if (bday > aquarius && bday < pisces) {
        return "Aquarius";
    } else if (bday > pisces && bday < aries) {
        return "Pisces";
    } else if (bday > aries && bday < taurus) {
        return "Aries";
    } else if (bday > taurus && bday < gemini) {
        return "Taurus";
    } else if (bday > gemini && bday < cancer) {
        return "Gemini";
    } else if (bday > cancer && bday < leo) {
        return "Cancer";
    } else if (bday > leo && bday < virgo) {
        return "Leo";
    } else if (bday > virgo && bday < libra) {
        return "Virgo";
    } else if (bday > libra && bday < scopio) {
        return "Libra";
    } else if (bday > scopio && bday < sagittarius) {
        return "Scopio";
    } else if (bday > sagittarius && bday < capricorn) {
        return "Sagittarius";
    } else {
        return "Capricorn";
    }
}

// console.log(getSign(birthday));


module.exports = {
    getSign
}