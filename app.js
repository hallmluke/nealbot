const Spark = require('node-sparky');
const express = require('express');
const bodyParser = require('body-parser');
const when = require('when');
 
const spark = new Spark({
  token: '<my token>',
  webhookSecret: 'somesecr3t',
});
 
const port = parseInt(process.env.PORT || '3000', 10);
 
// add events
spark.on('messages-created', msg => console.log(`${msg.personEmail} said: ${msg.text}`));
 
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
      targetUrl: 'https://nealbot.herokuapp.com/',
      resource: 'all',
      event: 'all',
    }));
  console.log(`Listening on port ${port}`);
});