// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This basic accelerometer example logs a stream
of x, y, and z data from the accelerometer
*********************************************/
var http = require('http');
var tessel = require('tessel');
var accel = require('accel-mma84').use(tessel.port['A']);
var fs = require('fs');
var audio = require('audio-vs1053b').use(tessel.port['B']);
var rateInHz = 2;



var DEFULT_STATE = 'illegal' ;
var state = DEFULT_STATE;
var count=0;
var data_array = new Array;
// Initialize the accelerometer.
accel.setOutputRate( rateInHz, function(err){});
accel.on('ready', function () {
    // Stream accelerometer data
  accel.on('data', function (xyz) {
    console.log('x:', xyz[0].toFixed(2),
      'y:', xyz[1].toFixed(2),
      'z:', xyz[2].toFixed(2));
      var data = {'x':xyz[0].toFixed(2),'y':xyz[1].toFixed(2),'z':xyz[2].toFixed(2),'n':count};
      data_array.push(data);
      count++;
      console.log(count);
      
      if(count%30 ===0){
        var json_str = JSON.stringify(data_array);
        var post_options = {
         host: '192.168.2.102',
         port: '2015',
          path: '/acc',
          method: 'POST',
          headers:{
           'Content-Type':'text/plain;charset=UTF-8'
          }
        };
  
        var post_req = http.request(post_options, function(res){
         res.setEncoding('utf8');
  
          res.on('data', function(chunk){
            state = chunk;
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
        data_array = new Array;
      }
  //
  });
});

accel.on('error', function(err){
  console.log('Error:', err);
});



var do_audio = function (input){
      audio.setVolume(.8);
      if (input==='legal'){
        var audioFile = fs.readFileSync('no.mp3');
        audio.play(audioFile, function(err) {});
      }
}