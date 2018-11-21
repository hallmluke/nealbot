snoowrap = require('snoowrap');

var matchWordRegex = function(word, text){
    var regexp = new RegExp(word, 'i');
    return regexp.test(text);
}

var getRandomInt = function(max) {
    return Math.floor(Math.random() * Math.floor(max));
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
        messages.push("I respond to the following prompts\n" + 
        "Banks asking me about my stories\n" + 
        "My favorite football team, the Saints\n" + 
        "Some annoying guy says something\n" + 
        "Being asked how to do anything\n\n" + 
        "Also, I'll just say lmao a lot.  I also like naps"
        );
        
    }
    if(matchWordRegex("banks", msg.personEmail) && matchWordRegex("status", msg.text)){
        returnMessage.text = "Those stories should be done by the end of the day";
        messages.push(returnMessage);
    }
    console.log("Saints? " + matchWordRegex("saints", msg.text));
    if(matchWordRegex("saints", msg.text)){
        returnMessage.text = "fuck the saints";
        messages.push(returnMessage);
    }

    if(matchWordRegex("packers", msg.text)){
        returnMessage.text = "packers suck";
        messages.push(returnMessage);
    }

    if(matchWordRegex("ice cream", msg.text)){
        returnMessage.text = "when the fuck did we get ice cream?"
        messages.push(returnMessage);
    }

    if(matchWordRegex("bills", msg.text)){
        returnMessage.mentionedPeople = [gifBotId];
        returnMessage.markdown = "<@personEmail:" + gifBotEmail + "|GifBot> " + "buffalo bills";
        delete returnMessage["text"];
        messages.push(returnMessage);
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
        returnMessage.text = lmao;
        messages.push(returnMessage);
    }

    if(Math.random() > .95){
        returnMessage.text = "imma take a fat nap"
        messages.push(returnMessage);
    }

    if(matchWordRegex("caleb", msg.personEmail)){
        for(i in messages){
            messages[i].text = messages[i].text + " traitor";
        }
    }

    return messages;
}


