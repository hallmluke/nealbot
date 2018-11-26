const schedule = require('node-schedule');
var i;
var j = schedule.scheduleJob('* * 1 * *', function(){});
var k = schedule.scheduleJob('* * 1 * *', function(){});
var getRandomInt = function(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

module.exports = function init(spark){
    i = schedule.scheduleJob('* 1 * * *', function(){

    
    j.cancel();
    k.cancel();
    var lunchtime = getRandomInt(59);
    j = schedule.scheduleJob(lunchtime + ' 16 * * *', function(){
        spark.roomsGet({ type: 'group' }, 10)
        .then(rooms => rooms.forEach(room => spark.messageSend({
            roomId: room.id,
            text: "who brought lunch today?"
        })))
        .catch(err => console.error(err));
        
        console.log('The answer to life, the universe, and everything!');
    });
    var alarmtime = getRandomInt(59);
    if(Math.random() > .7){
        k = schedule.scheduleJob(alarmtime + ' 15 * * *', function(){
            spark.roomsGet({ type: 'group' }, 10)
        .then(rooms => rooms.forEach(room => spark.messageSend({
            roomId: room.id,
            text: "overslept my alarm. be in the office soon"
        })))
        .catch(err => console.error(err));
        })
    }
})
}