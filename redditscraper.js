const http = require('http');
const bodyparser = require('body-parser');
const request = require('request');
const parser = require('node-html-parser');

var options = {
    uri: 'http://www.reddit.com',
    path: '/r/gaming',
    strictSSL: false
}


var regex3 = /www\.reddit\.com\/.{0,100}\"\,/g;

module.exports = function() {
    request(options, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

  var found4 = body.match(regex3);
  if(found4.length > 10){
    var link = found4[5];
  }
  else{
      var link = "www.reddit.com/r/gaming";
  }

  link = link.substring(0, response.length-2);
  console.log(link);
  return link;

  
  //console.log('body:', body); // Print the HTML for the Google homepage.
})};
