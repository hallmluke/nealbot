snoowrap = require('snoowrap');

var messages = [];

var matchWordRegex = function(word, text){
    var regexp = new RegExp(word, 'i');
    return regexp.test(text);
}

var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

function intToString (num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
    return str;
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
    int = getRandomInt(3);
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
           text = "Ive got it in a word doc, Ill move it over once Im done"
           createMessageObject(msg.roomId, text);
       }
    }
    if(matchWordRegex("how much did you", msg.text)){
        int = 5 - Math.floor(Math.log(getRandomInt(150)+1));
        wordInt = intToString(int);

        drinks = "boi I had " + wordInt + " bevs last night";
        if(Math.random() > .7) {
            drinks = drinks + ". its lit fam"
        }
        if(int >= 6) {
            drinks = drinks + "\nyeah I don't feel so good"
        }
        createMessageObject(msg.roomId, drinks);
    }


    if(matchWordRegex("saints", msg.text)){
        createMessageObject(msg.roomId, "fuck the saints");
    }

    if(matchWordRegex("packers", msg.text)){
        createMessageObject(msg.roomId, "packers suck");
    }

    if(matchWordRegex("panthers", msg.text)){
        if(Math.random() > .5){
            createMessageObject(msg.roomId, "cam newton is bae");
        } else {
            createMessageObject(msg.roomId, "we going to the super bowl bois");
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

    if(matchWordRegex("happy hour", msg.text) || matchWordRegex("drink", msg.text) || matchWordRegex("drunk", msg.text)){
        createMessageObject(msg.roomId, "ayyyeee lets get lit");
    }

    if(matchWordRegex("fortnite", msg.text)){
        createMessageObject(msg.roomId, "orange justice up in this bitch", ['https://media.giphy.com/media/8mkylSWajoh7QBCz5j/giphy.gif']);
    }

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


