const request = require('request');

var matchWordRegex = function(word, text){
    var regexp = new RegExp(word, 'i');
    return regexp.test(text);
}

var weather = function() {
    return new Promise((resolve, reject) => {
        request(url, function (err, response, body) {
            if(err){
                console.log('error:', error);
                reject(error);
            } else {
                console.log("the storm is tamed");
                resolve(body);
            }
        });
    });
}

var createMessageObject = function(roomId, text, files) {

    console.log("in create message object");
    var message = {};
    message.roomId = roomId;
    message.text = text;
    if(files){
        message.files = files;
    }
    console.log("message: " +  message);
    messages.push(message);
    console.log("after message push");
    console.log(messages);
}

let apiKey = 'a3f552ad9376d227338f01ccda02d6a8';
let city = '4744091';
let url = `http://api.openweathermap.org/data/2.5/weather?id=${city}&units=imperial&appid=${apiKey}`

var messages = [];

var createReply = async function(msg) {
    return new Promise((resolve, reject) => {
        messages = [];

        if(matchWordRegex("weather", msg.text)) {
            console.log("weathering the storm");
            weather().then((body) => {
                console.log(body);
                weather = JSON.parse(body)
                console.log(weather);
                resp = null;
                if (weather.main.temp < 45) {
                    resp = "Its cold as fuck boi\n"
                }
                else if(weather.main.temp < 70) {
                    resp = "What an average day\n"
                }
                else {
                    resp = "Hot as fuck outside rn\n"
                }
                for(i in weather.weather) {
                    if (weather.weather[i].id >= 200 && weather.weather[i].id < 299) {
                        resp += "These fucking thunderstorms need to go\n"
                    }
                    else if (weather.weather[i].id >= 300 && weather.weather[i] < 399) {
                        resp += "Its kinda raining outside.  Just enough to be annoying\n"
                    }
                    else if (weather.weather[i].id >= 500 && weather.weather[i] < 599) {
                        resp += "Its pouring outside rn.  Guess I won't be getting lunch\n"
                    }
                    else if (weather.weather[i].id >= 600 && weather.weather[i].id < 699) {
                        resp += "Yeah there's snow outside.  Can't drive through this, see you fine folks tomorrow\n"
                    }
                    else if (weather.weather[i].id == 800 ) {
                        resp += "Would you look at that it's actually a nice day outside\n"
                    }
                    else if (weather.weather[i].id < 800 ) {
                        resp += "Cloudy outside.  Its cool, I don't like the sun anyways\n"
                    }
                    else {
                        resp += "There's some crazy shit going on outside.  Fuck this I'm outta here\n"
                    }
                }

                createMessageObject(msg.roomId, resp);
            });

        };

    });
};

module.exports = createReply;