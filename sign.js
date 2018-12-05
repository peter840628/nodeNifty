console.log("connected to sign.js");

var signsDate = [
    Date.parse("1-20"), Date.parse("2-18"), Date.parse("3-20"), Date.parse("4-20"), Date.parse("5-21"),
    Date.parse("6-21"), Date.parse("7-23"), Date.parse("8-23"), Date.parse("9-23"), Date.parse("10-23"),
    Date.parse("11-22"), Date.parse("12-22")
];

const signs = ["Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scopio", "Sagittarius", "Capricorn"];

var getSign = (birthday) =>
{
    var bday = Date.parse(birthday.slice(5, 10));
    for (var i = 0; i < signsDate.length - 1; i++)
    {
        if (bday > signsDate[i] && bday < signsDate[i + 1])
        {
            return signs[i];
        }
    }
    return "Capricorn";
};

module.exports = {
    getSign, signs
};
