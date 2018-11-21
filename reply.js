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

    if(Math.random() > .7){
        if(Math.random() > .5){
            var lmao = "lmao";
        } else {
            var lmao = "lmfao"
        }
        var os = getRandomInt(4);
        for(i in os){
            lmao = lmao + 'o';
        }
        messages.push(lmao);
    }

    if(Math.random() > .95){
        messages.push("imma take a fat nap");
    }

    return messages;
}


