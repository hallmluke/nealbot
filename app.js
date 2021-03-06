const Spark = require('node-sparky');
const express = require('express');
const bodyParser = require('body-parser');
const when = require('when');
const botId = 'Y2lzY29zcGFyazovL3VzL0FQUExJQ0FUSU9OLzViMjYwNWZjLTEwMDgtNGNmOS1iNjIxLWI3OTFhY2U5NzI1MQ';
const reply = require('./reply');
const scheduled = require('./schedulemessage');
const scheduler = require('node-schedule');

const spark = new Spark({
  token: 'MDZkYWUwMzEtMjA2OS00ZjMzLTg3MWUtZTE5OGMxY2I0NDc2NjU1Zjg0NzctMTAw',
  webhookSecret: 'nealsmells',
});

scheduled(spark);

 
const port = parseInt(process.env.PORT || '3000', 10);
 
// add events
spark.on('messages-created', async (msg) => {
    console.log(JSON.stringify(msg, null, 4));
    await reply(msg).then((returnMessages) => {
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
});
 
const app = express();
app.use(bodyParser.json());
 
// add route for path that is listening for web hooks
app.post('/webhook', spark.webhookListen());
 
// start express server
app.listen(port, function() {
  // get exisiting webhooks
  spark.webhooksGet()
    // remove all existing webhooks
    .then(webhooks => when.map(webhooks, webhook => spark.webhookRemove(webhook.id)))
    // create spark webhook directed back to the externally accessible
    // express route defined above.
    .then(() => spark.webhookAdd({
      name: 'my webhook',
      targetUrl: 'https://nealbot.herokuapp.com/webhook',
      resource: 'all',
      event: 'all',
    }));
  console.log(`Listening on port ${port}`);
});