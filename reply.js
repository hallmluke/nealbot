const redditscrape = require('./redditscraper');
snoowrap = require('snoowrap');
const request = require('request');
const deasync = require('deasync');
//const redditscrape = require('./redditscraper');

let apiKey = 'a3f552ad9376d227338f01ccda02d6a8';
let city = '4744091';
let url = `http://api.openweathermap.org/data/2.5/weather?id=${city}&units=imperial&appid=${apiKey}`

var messages = [];

var matchWordRegex = function(word, text){
    var regexp = new RegExp(word, 'i');
    return regexp.test(text);
}

var a = ['zero','one','two','three','four', 'five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];

function intToString (num) {
    return a[num];
}

var getBodyPart = function() {
    int = getRandomInt(6);
    part = null;
    switch(int) {
        case 0:
            part = "arm"
            break;
        case 1:
            part = "back"
            break;
        case 2:
            part = "shoulder"
            break;
        case 3:
            part = "knee"
            break;
        case 4:
            part = "neck"
            break;
        case 5:
            part = "ribs"
            break;
        default:
            part = "leg"
    }
    return part;
}

var getActivity = function() {
    int = getRandomInt(7);
    activity = null;
    switch(int) {
        case 0:
            part = "at kickball"
            break;
        case 1:
            part = "at the bar"
            break;
        case 2:
            part = "at work"
            break;
        case 3:
            part = "playing Counter Strike"
            break;
        case 4:
            part = "playing Fortnite"
            break;
            case 4:
                part = "playing League"
                break;
        case 5:
            part = "committing seppuku"
            break;
        default:
            part = "playing soccer"
    }
    return part;
}

var getRandomInt = function(max) {
    return Math.floor(Math.random() * Math.floor(max));
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

var createReply = async function(msg) {
    return new Promise((resolve, reject) => {
        shittyNumber = 0;
        messages = [];

        if(msg.text.length >= 75){
            shittyNumber += 1;
            createMessageObject(msg.roomId, "you use lot word.  why use lot word when few word do trick");
            shittyNumber -= 1;
        }

        if(matchWordRegex("help", msg.text)){
            shittyNumber += 1;
            text = "I respond to the following prompts by way of keyword.  I won't tell you them though, because that'd mean being helpful and I'm Neal\n" +
            "Banks asking me about my stories\n" +
            "My favorite football team, the Saints\n" +
            "My casual alcoholism\n" +
            "Getting a cold snack\n" + 
            "My favorite first-person shooter, Fortnite\n" +
            "Going somewhere\n" + 
            "Getting something to drink\n" + 
            "How to talk to a database"
            "How to do anything\n\n" +
            "Also, I'll just say lmao a lot.  I also like naps";
            createMessageObject(msg.roomId, text);
            shittyNumber -= 1;
    
        }
        if(matchWordRegex("how much did you", msg.text)){
            shittyNumber += 1;
            int = 19 - Math.floor(Math.log(getRandomInt(8886105)+1));
            wordInt = intToString(int);
    
            drinks = "boi I had " + wordInt + " bevs last night";
            if(Math.random() > .7) {
                drinks = drinks + ". its lit fam"
            }
            if(int >= 6) {
                drinks = drinks + ".\nyeah I don't feel so good"
            }
            createMessageObject(msg.roomId, drinks);
            shittyNumber -= 1;
        }
    
        if(matchWordRegex("go for lunch", msg.text)) {
            shittyNumber += 1;
            createMessageObject(msg.roomId, "eh I went to cava again anyways");
            shittyNumber -= 1;
        }

        var weather = function() {
            return new Promise((resolve, reject) => {
                request(url, function (err, response, body) {
                    if(err){
                        console.log('error:', error);
                        reject(error);
                    } else {
                        resolve(body);
                    }
                });
            });
        }
    
        if(matchWordRegex("weather", msg.text)) {
            shittyNumber += 1;
            weather().then((body) => {
                weather = JSON.parse(body)
                resp = null;
                if (weather.main.temp < 45) {
                    resp = "It's cold outside "
                }
                else if(weather.main.temp < 75) {
                    resp = "Not that hot and not that cold, so I guess that's pretty chill "
                }
                else {
                    resp = "Pretty lit rn "
                }
                resp += "at " + weather.main.temp + " degrees\n"

                if(weather.wind.speed >= 15) {
                    resp += "Getting pretty windy with speeds up to " + weather.wind.speed + " miles per hour\n"
                }
                else {
                    resp += "Not that windy outside, so I guess that's nice\n"
                }
                if(weather.main.humidity > 70) {
                    resp += "Rather humid outside\n"
                }
                console.log(weather);
                for(i in weather.weather) {
                    if (weather.weather[i].id >= 200 && weather.weather[i].id < 299) {
                        resp += "These thunderstorms need to go\n"
                    }
                    else if (weather.weather[i].id >= 300 && weather.weather[i].id < 399) {
                        resp += "Its kinda raining outside.  Just enough to be annoying\n"
                    }
                    else if (weather.weather[i].id >= 500 && weather.weather[i].id < 599) {
                        resp += "Its pouring outside rn.  Guess I won't be getting lunch\n"
                    }
                    else if (weather.weather[i].id >= 600 && weather.weather[i].id < 699) {
                        resp += "Yeah there's snow outside.  Can't drive through this, see you fine folks tomorrow\n"
                    }
                    else if (weather.weather[i].id == 800 ) {
                        resp += "Would you look at that it's actually a nice day outside\n"
                    }
                    else if (weather.weather[i].id >= 700 && weather.weather[i].id < 749) {
                        resp += "I mean there's some fog or whatever that's not my problem\n"
                    }
                    else if (weather.weather[i].id > 800 ) {
                        resp += "Cloudy outside.  Its cool, I don't like the sun anyways\n"
                    }
                    else {
                        resp += "I'm outta here\n"
                    }
                }
                createMessageObject(msg.roomId, resp);
                shittyNumber -= 1;
            });
        };
    
        if(matchWordRegex("be in today", msg.text) || matchWordRegex("in the office", msg.text)) {
            shittyNumber += 1;
            x = getRandomInt(5);
            console.log(x);
            if( x < 1) {
                hour = "10"
                minute = getRandomInt(29) + 30;
                console.log(minute);
                
            }
            else if (x < 3) {
                hour = "11"
                minute = getRandomInt(59);
                console.log(minute);
                if (minute == 0) {
                    minute = "00"
                }
            }
            else if (x < 5) {
                hour = "12"
                minute = getRandomInt(59);
                console.log(minute);
                if (minute == 0) {
                    minute = "00"
                }
            }
            else {
                hour = "1"
                minute = getRandomInt(29);
                console.log(minute);
                if (minute == 0) {
                    minute = "00"
                }
            }
            late = "I'll be in by " + hour + ":" + minute + " hopefully"
            createMessageObject(msg.roomId, late);
            shittyNumber -= 1;
        }
    
        if(matchWordRegex("hi", msg.text) || matchWordRegex("hello", msg.text) || matchWordRegex("hey", msg.text) || matchWordRegex("whats up", msg.text)){
            shittyNumber += 1;
            createMessageObject(msg.roomId, "sup");
            shittyNumber -= 1;
        }
    
        if(matchWordRegex("bye", msg.text)){
            shittyNumber += 1;
            createMessageObject(msg.roomId, "bye buddy I hope you find your dad");
            shittyNumber -= 1;
        }
    
    
        if(matchWordRegex("saints", msg.text)){
            shittyNumber += 1;
            createMessageObject(msg.roomId, "I disapprove of the saints");
            shittyNumber -= 1;
        }
    
        if(matchWordRegex("packers", msg.text)){
            shittyNumber += 1;
            createMessageObject(msg.roomId, "Not a packers fan");
            shittyNumber -= 1;
        }
    
        if(matchWordRegex("panthers", msg.text)){
            shittyNumber += 1;
            if(Math.random() > .5){
                createMessageObject(msg.roomId, "cam newton is bae", ["https://media.giphy.com/media/l0MYGBjieOAC0hFzG/giphy.gif"]);
            } else {
                createMessageObject(msg.roomId, "we going to the super bowl bois", ["https://media.giphy.com/media/Qw7kp97PWrgNW/giphy.gif"]);
            }
            shittyNumber -= 1;
        }
    
        if(matchWordRegex("ice cream", msg.text)){
            shittyNumber += 1;
            text = "when did we get ice cream?";
            createMessageObject(msg.roomId, text);
            shittyNumber -= 1;
        }
    
        if(matchWordRegex("kickball", msg.text)){
            shittyNumber += 1;
            createMessageObject(msg.roomId, "yo luke when is the game tonight");
            shittyNumber -= 1;
        }
    
        if(matchWordRegex("happy hour", msg.text) || matchWordRegex("go drink", msg.text) || matchWordRegex("drunk", msg.text)){
            shittyNumber += 1;
            createMessageObject(msg.roomId, "ayyyeee lets get lit");
            shittyNumber -= 1;
        }
    
        if(matchWordRegex("fortnite", msg.text)){
            shittyNumber += 1;
            createMessageObject(msg.roomId, "orange justice fam", ['https://media.giphy.com/media/8mkylSWajoh7QBCz5j/giphy.gif']);
            shittyNumber -= 1;
        }
    
        /*if(matchWordRegex("reddit", msg.text)){
            var link = redditscrape();
            console.log(link);
            createMessageObject(msg.roomId, redditscrape());
        }*/

        if(matchWordRegex("how about", msg.text) || matchWordRegex("want to", msg.text) || matchWordRegex("how bout")) {
            shittyNumber += 1;
            var bet = "aight";
            if(Math.random() > .05) {
                bet = bet + " bet";
            }
            bet = bet + " im in";
            createMessageObject(msg.roomId, bet);
            shittyNumber -= 1;
        }
        if(matchWordRegex("cold", msg.text)) {
            shittyNumber += 1;
            createMessageObject(msg.roomId, "imma take that boys coat");
            shittyNumber -= 1;
        }
        if(matchWordRegex("cava", msg.text)){
            shittyNumber += 1;
            createMessageObject(msg.roomId, "anywhere but cava. I went there " + getRandomInt(15) + " times last week");
            shittyNumber -= 1;
        }
        if(matchWordRegex("thirsty", msg.text) || matchWordRegex("coffee", msg.text)){
            shittyNumber += 1;
            var psl = "bout to get me some pumpkin spice latte"
            if(Math.random() > .8) {
                psl = psl + " boi"
                var is = getRandomInt(3);
                for(var i=0; i<is; i++){
                    psl = psl + 'i';
                }
            }
            psl = psl + "!"
            createMessageObject(msg.roomId, psl);
            shittyNumber -= 1;
        }
        if(matchWordRegex("you ok", msg.text) || matchWordRegex("feeling alright", msg.text) || matchWordRegex("hurt", msg.text)) {
            shittyNumber += 1;
            var hurt = null;
            if(Math.random() > .1) {    
                hurt = "nah fam hurt my "
                hurt = hurt + getBodyPart();
                hurt = hurt + " ";
                hurt = hurt + getActivity();
                hurt = hurt + " last night";
                if(Math.random() > .9) {
                    hurt = hurt + ". its pretty bad, might take tomorrow off";
                }
            }
            else {
                hurt = "yeah im alright"
                if(Math.random() > .7) {
                    hurt = hurt + ". thanks for asking";
                }
            }
            createMessageObject(msg.roomId, hurt);
            shittyNumber -= 1;
    
        }
        if(matchWordRegex(" elf ", msg.text) || matchWordRegex("halfling", msg.text) || matchWordRegex("gnome", msg.text)) {
            shittyNumber += 1;
            createMessageObject(msg.roomId, "You've been gnomed!");
            shittyNumber -= 1;
        }
        if(matchWordRegex("dynamo", msg.text) || matchWordRegex("database", msg.text)) {
            shittyNumber += 1;
            dynamo = "id";
            if(Math.random() > .6) {
                dynamo = dynamo + "f"
            }
            dynamo = dynamo + "k ask "
            if(Math.random() > .5) {
                dynamo = dynamo + "Tom";
            }
            else {
                dynamo = dynamo + "Luke";
            }
            if(Math.random() > .4) {
                dynamo = dynamo + " hes our Dynamo"
                if(Math.random() > .5) {
                    dynamo = dynamo + " guy"
                }
                else {
                    dynamo = dynamo + " expert"
                }
            }
            createMessageObject(msg.roomId, dynamo);
            shittyNumber -= 1;
        }
        if(matchWordRegex("how do", msg.text)){
            shittyNumber += 1;
            var idk = "id";
            if(Math.random > .6){
                idk + idk + "f";
            }
            idk = idk + "k, ask Sam";
            createMessageObject(msg.roomId, idk);
            shittyNumber -= 1;
        }
        generic = Math.random();
        if(generic > .8){
            if(Math.random() > .5){
                var lmao = "lmao";
            } else {
                var lmao = "lmfao"
            }
            var os = getRandomInt(4);
            for(var i=0; i<os; i++){
                lmao = lmao + 'o';
            }
            createMessageObject(msg.roomId, lmao);
        }
        else if(generic > .6){
            createMessageObject(msg.roomId, "yeet");
        }
        else if (generic > .3){
            createMessageObject(msg.roomId, "bet");
        }
    
        if(Math.random() > .95){
            createMessageObject(msg.roomId, "imma take a fat nap");
        }
    
        if(messages.length == 0){
            createMessageObject(msg.roomId, "lol");
        }

        console.log("Reached end of reply");
        deasync.loopWhile(function() {return shittyNumber != 0});
        resolve(messages);
    });
};

module.exports = createReply;