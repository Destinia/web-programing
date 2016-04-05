// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This basic RFID example listens for an RFID
device to come within range of the module,
then logs its UID to the console.
*********************************************/
var http = require('http');
var tessel = require('tessel');
var rfidlib = require('rfid-pn532');
var rfid = rfidlib.use(tessel.port['A']); 
var fs = require('fs');
var audio = require('audio-vs1053b').use(tessel.port['C']);

var DEFULT_STATE = 'illegal' ;
var state = DEFULT_STATE;


rfid.on('ready', function (version) {
  console.log('Ready to read RFID card');

  rfid.on('data', function(card) {
    console.log('UID:', card.uid.toString('hex'));
    var data = {'UID':card.uid.toString('hex')};
    var json_str = JSON.stringify(data);

// It Works!!!!
console.log('sdasad');
      //audio.setVolume(.8);
      /*if (state==='illegal'){
        var audioFile = fs.readFileSync('familymart.mp3');
              audio.play(audioFile, function(err) {});
      }*/
console.log('asdasdsa');
//


//
    var post_options = {
      host: '192.168.2.102',
      port: '2015',
      path: '/rfid',
      method: 'POST',
      headers:{
        'Content-Type':'text/plain;charset=UTF-8'
      }
    };

    var post_req = http.request(post_options, function(res){
      res.setEncoding('utf8');
      res.on('data', function(chunk){
        console.log('Response: '+chunk);
        console.log(typeof(chunk));
        state = chunk;
      });
     res.on('end',function(){
      //state = res_body; //call function when response
      console.log("here"+state);
      do_audio(state);
     });
    });
    
    post_req.write(json_str);
    console.log("str"+json_str);
    post_req.on('error',function(e){
      console.log('ERROR:  ' +e.message);
    });
    post_req.end();

    //
  });
});

rfid.on('error', function (err) {
  console.log('qweqe');
  console.error(err);
});



var do_audio = function (input){
      audio.setVolume(.8);
      console.log("aaa");
      console.log(input);
      console.log(typeof(input));
      if (input==='legal'){

        var audioFile = fs.readFileSync('familymart.mp3');
              audio.play(audioFile, function(err) {});
      }
}