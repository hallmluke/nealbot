snoowrap = require('snoowrap');

var matchWordRegex = function(word, text){
    var regexp = new RegExp(word, 'i');
    return regexp.test(text);
}

var getRandomInt = function(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

var createMessageObject = function(roomId, text, html) {
    console.log("in create message object");
    messages.push({
        roomId: roomId,
        text: text
    });
    console.log("after message push");
    console.log(messages);
}

const gifBotId = 'Y2lzY29zcGFyazovL3VzL1BFT1BMRS9lMjM0Mzg4Yi0wNGE2LTQ1OGEtOTU2ZC02ODVjZWQ4ZWI1NzI';

const gifBotEmail = "gifbot@webex.bot";



module.exports = function createReply(msg) {
    var returnMessage = {
        roomId: "",
        text: "",
    }
    var messages = [];
    returnMessage.roomId = msg.roomId;
    if(matchWordRegex("what good are you")){
        helpReturnMessage.roomId = msg.roomId;
        helpReturnMessage.text = "I respond to the following prompts\n" + 
        "Banks asking me about my stories\n" + 
        "My favorite football team, the Saints\n" + 
        "Some annoying guy says something\n" + 
        "Being asked how to do anything\n\n" + 
        "Also, I'll just say lmao a lot.  I also like naps";
        messages.push(helpReturnMessage);
        
    }
    if(matchWordRegex("banks", msg.personEmail) && matchWordRegex("status", msg.text)){
        banksReturnMessage.roomId = msg.roomId;
        banksReturnMessage.text = "Those stories should be done by the end of the day";
        messages.push(banksReturnMessage);
    }
    console.log("Saints? " + matchWordRegex("saints", msg.text));
    if(matchWordRegex("saints", msg.text)){
        console.log("hit stains");
        createMessageObject(msg.roomId, "fuck the saints");
    }

    /*if(matchWordRegex("packers", msg.text)){
        packersReturnMessage.roomId = msg.roomId;
        packersReturnMessage.text = "packers suck";
        messages.push(packersReturnMessage);
    }

    if(matchWordRegex("ice cream", msg.text)){
        iceCreamReturnMessage.roomId = msg.roomId;
        iceCreamReturnMessage.text = "when the fuck did we get ice cream?"
        messages.push(iceCreamReturnMessage);
    }

    if(matchWordRegex("kickball", msg.text)){
        
    }

    if(matchWordRegex("bills", msg.text)){
        billsReturnMessage.roomId = msg.roomId;
        billsReturnMessage.mentionedPeople = [gifBotId];
        billsReturnMessage.text = "GifBot buffalo bills";
        billsReturnMessage.html = "<spark-mention data-object-type=\"person\" data-object-id=\"" + gifBotId + "\">GifBot</spark-mention> buffalo bills",
        
        //returnMessage.markdown = "<@personEmail:" + gifBotEmail + "|GifBot> " + "buffalo bills";
        //delete returnMessage["text"];
        messages.push(billsReturnMessage);
    }
    if(matchWordRegex("pearce_thomas@bah.com", msg.personEmail)){
        var stfu = "Tom shut ";
        if(Math.random() > .75){
            stfu = stfu + "the fuck "
        }
        stfu = stfu + "up!"
        stfuReturnMessage.roomId = msg.roomId;
        stfuReturnMessage.text = stfu;
        messages.push(stfuReturnMessage);
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
        idkReturnMessage.roomId = msg.roomId;
        idkReturnMessage.text = idk;
        messages.push(idkReturnMessage);
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
        lmaoReturnMessage.roomId = msg.roomId;
        lmaoReturnMessage.text = lmao;
        messages.push(lmaoReturnMessage);
    }

    if(Math.random() > .95){
        napReturnMessage.roomId = msg.roomId;
        napReturnMessage.text = "imma take a fat nap"
        messages.push(napReturnMessage);
    }

    if(matchWordRegex("caleb", msg.personEmail)){
        for(i in messages){
            messages[i].text = messages[i].text + " traitor";
        }
    }*/
    console.log("Reached end of reply");
    return messages;
}


