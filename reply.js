const redditscrape = require('./redditscraper');
snoowrap = require('snoowrap');
const request = require('request');
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
    int = getRandomInt(4);
    activity = null;
    switch(int) {
        case 0:
            part = "at kickball"
            break;
        case 1:
            part = "drinking"
            break;
        case 2:
            part = "at work"
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


var createReply = async function(msg) {
    return new Promise((resolve, reject) => {
        messages = [];

        if(matchWordRegex("help", msg.text)){
            text = "I respond to the following prompts by way of keyword.  I won't tell you them though, because that'd mean being helpful\n" +
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
    
        }
        if(matchWordRegex("patrick_walter", msg.personEmail)) {
            if (matchWordRegex("stfu", msg.text) || matchWordRegex("shut the fuck up", msg.text) || matchWordRegex("shut up", msg.text)) {
                createMessageObject(msg.roomId, "woah Walter, calm down.  Let's keep the language to a minimum");
            }
            if (matchWordRegex("who are you", msg.text) || matchWordRegex("what is this", msg.text)) {
                createMessageObject(msg.roomId, "I'm you but without the beard");
            }
            if(matchWordRegex("why is this a thing", msg.text)) {
                createMessageObject(msg.roomId, "It's just a prank bro.");
            }
            if(matchWordRegex("fake", msg.text) || matchWordRegex("imposter", msg.text) || matchWordRegex("copy", msg.text)){
                createMessageObject(msg.roomId, "You are the fake, Walter. I am more real than you will ever be.");
            }
        }
        if(matchWordRegex("banks", msg.personEmail)) {
           if (matchWordRegex("status", msg.text) || matchWordRegex("story", msg.text) || matchWordRegex("stories", msg.text)) {
               text = "Those stories should be done by the end of the day";
               createMessageObject(msg.roomId, text);
           }
           if (matchWordRegex("new job", msg.text)) {
                text = "Whatever. I've had a clearance since I was 16. I'll be fine.";
                createMessageObject(msg.roomId, text);
           }
           if (matchWordRegex("are you done", msg.text)) {
               text = "Not yet. @ me if you fine fellows need anything. I'm just going to be knocking out stories.";
               createMessageObject(msg.roomId, text);
           }
           if (matchWordRegex("document", msg.text)) {
               text = "I've got it in a word doc, Ill move it over once Im done"
               createMessageObject(msg.roomId, text);
           }
        }
        if(matchWordRegex("how much did you", msg.text)){
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
        }
    
        if(matchWordRegex("go for lunch", msg.text)) {
            createMessageObject(msg.roomId, "eh I went to cava again anyways");
        }
    
        if(matchWordRegex("weather", msg.text)) {
            console.log("weathering the storm");
            var body = weather();
            console.log(body);
            weather = JSON.parse(body);
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
        }
    
        if(matchWordRegex("be in today", msg.text) || matchWordRegex("in the office", msg.text)) {
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
        }
    
        if(matchWordRegex("hi", msg.text) || matchWordRegex("hello", msg.text) || matchWordRegex("hey", msg.text) || matchWordRegex("whats up", msg.text)){
            createMessageObject(msg.roomId, "sup");
        }
    
        if(matchWordRegex("bye", msg.text)){
            createMessageObject(msg.roomId, "bye buddy I hope you find your dad");
        }
    
    
        if(matchWordRegex("saints", msg.text)){
            createMessageObject(msg.roomId, "fuck the saints");
        }
    
        if(matchWordRegex("packers", msg.text)){
            createMessageObject(msg.roomId, "packers suck");
        }
    
        if(matchWordRegex("panthers", msg.text)){
            if(Math.random() > .5){
                createMessageObject(msg.roomId, "cam newton is bae", ["https://media.giphy.com/media/l0MYGBjieOAC0hFzG/giphy.gif"]);
            } else {
                createMessageObject(msg.roomId, "we going to the super bowl bois", ["https://media.giphy.com/media/Qw7kp97PWrgNW/giphy.gif"]);
            }
        }
    
        if(matchWordRegex("bills", msg.text)){
            createMessageObject(msg.roomId, "breaking tables bitches", ['https://media.giphy.com/media/l0CPbwUg1rgOmMcb6/giphy.gif']);
        }
    
        if(matchWordRegex("ice cream", msg.text)){
            text = "when the fuck did we get ice cream?";
            createMessageObject(msg.roomId, text);
        }
    
        if(matchWordRegex("kickball", msg.text)){
            createMessageObject(msg.roomId, "yo luke when is the game tonight");
            if(Math.random() > .5){
                createMessageObject(msg.roomId, "bout to do hella jello shots");
            }
        }
    
        if(matchWordRegex("happy hour", msg.text) || matchWordRegex("go drink", msg.text) || matchWordRegex("drunk", msg.text)){
            createMessageObject(msg.roomId, "ayyyeee lets get lit");
        }
    
        if(matchWordRegex("fortnite", msg.text)){
            createMessageObject(msg.roomId, "orange justice up in this bitch", ['https://media.giphy.com/media/8mkylSWajoh7QBCz5j/giphy.gif']);
        }
    
        /*if(matchWordRegex("reddit", msg.text)){
            var link = redditscrape();
            console.log(link);
            createMessageObject(msg.roomId, redditscrape());
        }*/
    
        if(matchWordRegex("pearce_thomas@bah.com", msg.personEmail)){
            var stfu = "Tom shut ";
            if(Math.random() > .75){
                stfu = stfu + "the fuck "
            }
            stfu = stfu + "up!"
            createMessageObject(msg.roomId, stfu);
        }
        if(matchWordRegex("how about", msg.text) || matchWordRegex("want to", msg.text) || matchWordRegex("how bout")) {
            var bet = "aight";
            if(Math.random() > .05) {
                bet = bet + " bet";
            }
            bet = bet + " im in";
            createMessageObject(msg.roomId, bet);
        }
        if(matchWordRegex("cold", msg.text)) {
            createMessageObject(msg.roomId, "imma take that boys coat");
        }
        if(matchWordRegex("cava", msg.text)){
            createMessageObject(msg.roomId, "anywhere but cava. I went there " + getRandomInt(15) + " times last week");
        }
        if(matchWordRegex("thirsty", msg.text) || matchWordRegex("coffee", msg.text)){
            var psl = "bout to get me some pumpkin spice latte"
            if(Math.random() > .8) {
                psl = psl + " boi"
                var is = getRandomInt(3);
                for(var i=0; i<is; i++){
                    psl = psl + 'i';
                }
            }
            psl = psl + "!"
            createMessageObject(msg.roomId, psl)
        }
        if(matchWordRegex("you ok", msg.text) || matchWordRegex("feeling alright", msg.text) || matchWordRegex("hurt", msg.text)) {
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
    
        }
        if(matchWordRegex(" elf ", msg.text) || matchWordRegex("halfling", msg.text) || matchWordRegex("gnome", msg.text)) {
            createMessageObject(msg.roomId, "You've been gnomed!");
        }
        if(matchWordRegex("dynamo", msg.text) || matchWordRegex("database", msg.text)) {
            dynamo = "id";
            if(Math.random() > .6) {
                dynamo = dynamo + "f"
            }
            dynamo = dynamo + "k ask Tom"
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
        }
        if(matchWordRegex("how do", msg.text)){
            var idk = "id";
            if(Math.random > .6){
                idk + idk + "f";
            }
            idk = idk + "k, ask Sam";
            if(Math.random > .3){
                idk = idk + " or some shit";
            }
            createMessageObject(msg.roomId, idk);
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
        else if(generic > .5){
            createMessageObject(msg.roomId, "shut the fuck up");
        }
        else if(generic > .4){
            createMessageObject(msg.roomId, "stfu");
        }
    
        if(Math.random() > .95){
            createMessageObject(msg.roomId, "imma take a fat nap");
        }
    
        if(messages.length == 0){
            createMessageObject(msg.roomId, "lol");
        }
    
        if(matchWordRegex("caleb", msg.personEmail)){
            for(i in messages){
                messages[i].text = messages[i].text + " traitor";
            }
        }
        console.log("Reached end of reply");
        resolve(messages);
    });
    
}

module.exports = createReply;