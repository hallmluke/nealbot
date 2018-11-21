const schedule = require('node-schedule');
var j = schedule.scheduleJob('* * 1 * *', function(){});
var getRandomInt = function(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

module.exports = function init(spark){
    j.cancel();
    var lunchtime = getRandomInt(59);
    j = schedule.scheduleJob(lunchtime + ' 13 * * *', function(){
        spark.roomsGet({ type: 'group' }, 10)
        .then(rooms => rooms.forEach(room => spark.messageSend({
            roomId: room.id,
            text: "who brought lunch today?"
        })))
        .catch(err => console.error(err));
        
        console.log('The answer to life, the universe, and everything!');
    });
}