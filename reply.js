snoowrap = require('snoowrap');

var messages = [];

var matchWordRegex = function(word, text){
    var regexp = new RegExp(word, 'i');
    return regexp.test(text);
}

var getRandomInt = function(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

var createMessageObject = function(roomId, text) {
    
    console.log("in create message object");
    var message = {};
    message.roomId = roomId;
    message.text = text;
    console.log("message: " +  message);
    messages.push(message);
    console.log("after message push");
    console.log(messages);
}

const gifBotId = 'Y2lzY29zcGFyazovL3VzL1BFT1BMRS9lMjM0Mzg4Yi0wNGE2LTQ1OGEtOTU2ZC02ODVjZWQ4ZWI1NzI';

const gifBotEmail = "gifbot@webex.bot";



module.exports = function createReply(msg) {
    messages = [];

    if(matchWordRegex("what good are you")){
        text = "I respond to the following prompts\n" + 
        "Banks asking me about my stories\n" + 
        "My favorite football team, the Saints\n" + 
        "Some annoying guy says something\n" + 
        "Being asked how to do anything\n\n" + 
        "Also, I'll just say lmao a lot.  I also like naps";
        createMessageObject(msg.roomId, text);
        
    }
    if(matchWordRegex("banks", msg.personEmail) && matchWordRegex("status", msg.text)){
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
        text = "when the fuck did we get ice cream?"
        createMessageObject(msg.roomId, text);
    }

    if(matchWordRegex("kickball", msg.text)){
        
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


