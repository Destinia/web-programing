// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This camera example takes a picture. If a
directory is specified with the --upload-dir
flag, the picture is saved to that directory.
*********************************************/
var http = require('http');
var tessel = require('tessel');
var camera = require('camera-vc0706').use(tessel.port['A']);
var fs = require('fs');
var audio = require('audio-vs1053b').use(tessel.port['B']);

//var http = require('http');     Error: No UART Response...


/*
var http_post = function (where, text_to_send, callback) {
  if (typeof where !== 'string') throw TypeError();
  if (typeof text_to_send !== 'object') throw TypeError();
  if (typeof callback !== 'function') throw TypeError();

  fetch(where, {method: 'POST', body: text_to_send})
    .then(function (response) {
      return response.text();
    })
    .then(function (server_response_text) {
      callback(server_response_text);
    })
    .catch(function (err) {
      callback(null, err);
    });
};
*/

var DEFULT_STATE = 'illegal' ;
var state = DEFULT_STATE;

var notificationLED = tessel.led[3]; // Set up an LED to notify when we're taking a picture

// Wait for the camera module to say it's ready
camera.on('ready', function() {
  notificationLED.high();
  // Take the picture
  camera.takePicture(function(err, image) {
    if (err) {
      console.log('error taking image', err);
    } else {
      notificationLED.low();
      // Name the image
      var name = 'picture-' + Math.floor(Date.now()*1000) + '.jpg';
      // Save the image
      console.log('Picture saving as', name, '...');
      process.sendfile(name, image);

      console.log('done.',image);
      console.log('#',typeof(image));
      // Turn the camera off to end the script
      camera.disable();
      //send_to_server_camera(image);

  var post_options = {
    host: '192.168.2.102',
    port: '2015',
    path: '/photo',
    method: 'POST',
    headers:{
      'Content-Type':'image/jpeg'
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

  post_req.write(image);
  post_req.on('error',function(e){
    console.log('ERROR:  ' +e.message);
  });
  post_req.end();

    }
  });
});

camera.on('error', function(err) {
  console.error(err);
});

/*
var send_to_server_camera = function (text_to_send) {
  if (typeof text_to_send !== 'object') throw TypeError();
  http_post('/photo', text_to_send, data_from_server_callback_camera);
};

var data_from_server_callback_camera = function (result) {
  log_textarea_elm.value += '>>> [' + result + ']\n';
};
*/


var do_audio = function (input){

      audio.setVolume(.8);
      if (input==='legal'){
        var audioFile = fs.readFileSync('shutter.mp3');
        audio.play(audioFile, function(err) {});
      }

      
}