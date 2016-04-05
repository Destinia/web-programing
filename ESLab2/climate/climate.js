// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This basic climate example logs a stream
of temperature and humidity to the console.
*********************************************/
var http = require('http');
var tessel = require('tessel');
// if you're using a si7020 replace this lib with climate-si7020
var climatelib = require('climate-si7020');
var climate = climatelib.use(tessel.port['A']);
var fs = require('fs');
var audio = require('audio-vs1053b').use(tessel.port['B']);
var count = 0;
var data_arr = new Array;

var DEFULT_STATE = 'illegal' ;
var state = DEFULT_STATE;

climate.on('ready', function () {
  console.log('Connected to si7005');

  // Loop forever
  setImmediate(function loop () {
    climate.readTemperature('f', function (err, temp) {
      climate.readHumidity(function (err, humid) {
        console.log('Degrees:', temp.toFixed(4) + 'F', 'Humidity:', humid.toFixed(4) + '%RH');
        var data = {'Degrees':temp.toFixed(4),'Humidity':humid.toFixed(4),'n':count};
        data_arr.push(data);
        count++;

        if(count%30===0){
          var json_str = JSON.stringify(data_arr);
          //
          var post_options = {
            host: '192.168.2.102',
           port: '2015',
            path: '/climate',
            method: 'POST',
            headers:{
              'Content-Type':'text/plain;charset=UTF-8'
           }
          };
  
          var post_req = http.request(post_options, function(res){
           res.setEncoding('utf8');
  
            res.on('data', function(chunk){
              console.log('Response: '+chunk);
              state=chunk;
            });
            res.on('end',function(res_body){
  
              do_audio(state);
            });
          });
  
          post_req.write(json_str);
          post_req.on('error',function(e){
            console.log('ERROR:  ' +e.message);
          });
          post_req.end();
        }

        setTimeout(loop, 300);
      });
    });
  });
});

climate.on('error', function(err) {
  console.log('error connecting module', err);
});




var do_audio = function (input){
      audio.setVolume(.8);
      if (input==='hot'){
        var audioFile = fs.readFileSync('hot.mp3');
        audio.play(audioFile, function(err) {
        });
      }
      if (input==='cold'){
        var audioFile = fs.readFileSync('cold.mp3');
        audio.play(audioFile, function(err) {
        });
      }
}

