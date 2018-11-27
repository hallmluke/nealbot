fuckit2 = require('./fuckit2');

fuckit = async function (msg){
    await fuckit2(msg).then((returnMessages) => {
      console.log("Return Messages: ");
      console.log(returnMessages);
    });
}

message = {
    text: "weather",
    roomId: "franklydearidontgiveadamn"
}

fuckit(message);