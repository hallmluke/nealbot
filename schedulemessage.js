const schedule = require('node-schedule');

module.exports = function init(spark){
    var j = schedule.scheduleJob('* * * * *', function(){
        spark.roomsGet({ type: 'group' }, 10)
        .then(rooms => rooms.forEach(room => spark.messageSend({
            roomId: room.id,
            text: "who brought lunch today?"
        })))
        .catch(err => console.error(err));
        
        console.log('The answer to life, the universe, and everything!');
    });
}