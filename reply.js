snoowrap = require('snoowrap');

var matchWordRegex = function(word, text){
    var regexp = new RegExp(word, 'i');
    return regexp.test(text);
}

var getRandomInt = function(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

module.exports = function createReply(msg) {
    var messages = [];
    if(matchWordRegex("banks", msg.personEmail) && matchWordRegex("status", msg.text)){
        messages.push("Those stories should be done by the end of the day");
    }
    console.log("Saints? " + matchWordRegex("saints", msg.text));
    if(matchWordRegex("saints", msg.text)){
        messages.push("fuck the saints");
    }
    if(matchWordRegex("pearce_thomas@bah.com", msg.personEmail)){
        var stfu = "Tom shut ";
        if(Math.random() > .75){
            stfu = stfu + "the fuck "
        }
        stfu = stfu + "up!"
        messages.push(stfu);
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
        messages.push(idk);
    }
    if(Math.random() > .4){
        if(Math.random() > .5){
            var lmao = "lmao";
        } else {
            var lmao = "lmfao"
        }
        var os = getRandomInt(4);
        for(var i=0; i<os; i++){
            lmao = lmao + 'o';
        }
        messages.push(lmao);
    }

    if(Math.random() > .95){
        messages.push("imma take a fat nap");
    }

    return messages;
}


