fuckit2 = require('./fuckit2');

fuckit = async function (msg){
    console.log(JSON.stringify(msg, null, 4));
    await fuckit2(msg).then((returnMessages) => {
      console.log("Return Messages: " + returnMessages);
      if(msg.personEmail != "nealbot@webex.bot") {
          console.log("not the bot");
          for(i in returnMessages){
              console.log("in the for loop");
              console.log(JSON.stringify(returnMessages[i]));
              spark.messageSend(returnMessages[i]).then(message => console.log(message.id)).catch(err => console.error(err));
          }
      }
    });
}

message = {
    text: "weather",
    roomId: "franklydearidontgiveadamn"
}

fuckit(message);