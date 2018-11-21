snoowrap = require('snoowrap');

var messages = [];

var matchWordRegex = function(word, text){
    var regexp = new RegExp(word, 'i');
    return regexp.test(text);
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

const gifBotId = 'Y2lzY29zcGFyazovL3VzL1BFT1BMRS9lMjM0Mzg4Yi0wNGE2LTQ1OGEtOTU2ZC02ODVjZWQ4ZWI1NzI';

const gifBotEmail = "gifbot@webex.bot";



module.exports = function createReply(msg) {
    messages = [];

    if(matchWordRegex("what good are you", msg.text)){
        text = "I respond to the following prompts\n" + 
        "Banks asking me about my stories\n" + 
        "My favorite football team, the Saints\n" + 
        "Some annoying guy says something\n" + 
        "Being asked how to do anything\n\n" + 
        "Also, I'll just say lmao a lot.  I also like naps";
        createMessageObject(msg.roomId, text);
        
    }
    if(matchWordRegex("banks", msg.personEmail) && (matchWordRegex("status", msg.text) || matchWordRegex("story", msg.text) || matchWordRegex("stories", msg.text))){
        text = "Those stories should be done by the end of the day";
        createMessageObject(msg.roomId, text);
    }
    console.log("Saints? " + matchWordRegex("saints", msg.text));
    if(matchWordRegex("saints", msg.text)){
        createMessageObject(msg.roomId, "fuck the saints");
    }

    if(matchWordRegex("packers", msg.text)){
        createMessageObject(msg.roomId, "packers suck");
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

    if(matchWordRegex("happy hour", msg.text) || matchWordRegex("drink", msg.text) || matchWordRegex("drunk", msg.text)){
        createMessageObject(msg.roomId, "ayyyeee lets get lit");
    }

    if(matchWordRegex("fortnite", msg.text)){
        createMessageObject(msg.roomId, "orange justice up in this bitch", ['https://media.giphy.com/media/8mkylSWajoh7QBCz5j/giphy.gif']);
    }

    /*if(matchWordRegex("bills", msg.text)){
        billsReturnMessage.roomId = msg.roomId;
        billsReturnMessage.mentionedPeople = [gifBotId];
        billsReturnMessage.text = "GifBot buffalo bills";
        billsReturnMessage.html = "<spark-mention data-object-type=\"person\" data-object-id=\"" + gifBotId + "\">GifBot</spark-mention> buffalo bills",
        
        //returnMessage.markdown = "<@personEmail:" + gifBotEmail + "|GifBot> " + "buffalo bills";
        //delete returnMessage["text"];
        messages.push(billsReturnMessage);
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
    if(matchWordRegex("thirsty", msg.text) || matchWordRegex("coffee", msg.text)){
        var psl = "bout to get me some pumpkin spice latte"
        if(Math.random() > .8) {
            psl = psl + " boi"
            var is = getRandomInt(3);
            for(var i=0; i<os; i++){
                psl = psl + 'i';
            }
        }
        psl = psl + "!"
        createMessageObject(msg.roomId, psl)
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
        createMessageObject(msg.roomId, lmao);
    }

    if(Math.random() > .95){
        createMessageObject(msg.roomId, "imma take a fat nap");
    }

    if(matchWordRegex("caleb", msg.personEmail)){
        for(i in messages){
            messages[i].text = messages[i].text + " traitor";
        }
    }
    console.log("Reached end of reply");
    return messages;
}


