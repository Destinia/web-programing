var httpserver = require('./httpserver.js');

var configs = function (set_port, set_hostname, set_handler) {
  set_port(2015);
  set_hostname('10.118.175.114');
  set_handler('GET /', do_output_html);
  set_handler('GET /index.html', do_output_html);
  set_handler('GET /main.css', do_output_css);
  set_handler('GET /main.js', do_output_js);
  set_handler('GET /favicon.ico', do_output_favicon);
  set_handler('GET /acc.html',do_output_acc);
  set_handler('GET /climate.html',do_output_cli);
  set_handler('GET /rfid.html',do_output_rfid);
  set_handler('GET /camera.html',do_output_camera);
  set_handler('GET /picture.jpg',do_output_pic);
  //set_handler('POST /echo', do_echo);
  set_handler('POST /photo', do_camera);
  set_handler('POST /acc', do_accel);
  //set_handler('POST /audio', do_audio);
  set_handler('POST /rfid', do_rfid);
  set_handler('POST /climate', do_climate);
  set_handler('POST /data_acc',do_data_acc);
  set_handler('POST /data_cli',do_data_cli);
  set_handler('POST /data_rfid',do_data_rfid);
};

var do_output_html = function (send_response) {
  require('fs').readFile('static_files/index.html', function (err, data) {
    if (err) throw err;
    send_response(data, {'Content-Type': 'text/html; charset=utf-8'});
  });
};

var do_output_css = function (send_response) {
  require('fs').readFile('static_files/main.css', function (err, data) {
    if (err) throw err;
    send_response(data, {'Content-Type': 'text/css; charset=utf-8'});
  });
};

var do_output_js = function (send_response) {
  require('fs').readFile('static_files/main.js', function (err, data) {
    if (err) throw err;
    send_response(data, {'Content-Type': 'text/javascript; charset=utf-8'});
  });
};

var do_output_favicon = function (send_response) {
  require('fs').readFile('static_files/favicon.ico', function (err, data) {
    if (err) throw err;
    send_response(data, {'Content-Type': 'image/x-icon'});
  });
};

var do_output_pic = function (send_response) {
  require('fs').readFile('picture.jpg', function (err, data) {
    if (err) throw err;
    send_response(data, {'Content-Type': 'image'});
  });
};

var do_output_acc = function (send_response){
  require('fs').readFile('static_files/acc.html', function (err, data) {
    if (err) throw err;
    send_response(data, {'Content-Type': 'text/html; charset=utf-8'});
  });
};

var do_output_cli = function(send_response){
  require('fs').readFile('static_files/climate.html', function (err, data) {
    if (err) throw err;
    send_response(data, {'Content-Type': 'text/html; charset=utf-8'});
  });
};

var do_output_rfid = function (send_response){
  require('fs').readFile('static_files/rfid.html', function (err, data) {
    if (err) throw err;
    send_response(data, {'Content-Type': 'text/html;charset=UTF-8'});
  });
};

var do_output_camera = function (send_response){
  require('fs').readFile('static_files/camera.html', function (err, data) {
    if (err) throw err;
    send_response(data, {'Content-Type': 'text/html;charset=UTF-8'});
  });
};

var do_data_acc = function (send_response){
  require('fs').readFile('accel.db', function (err, data) {
    if (err) throw err;
    send_response(data, {'Content-Type': 'text/plain;charset=UTF-8'});
  });
};

var do_data_cli = function (send_response){
  require('fs').readFile('climate.db', function (err, data) {
    if (err) throw err;
    send_response(data, {'Content-Type': 'text/plain;charset=UTF-8'});
  });
};

var do_data_rfid = function (send_response){
  require('fs').readFile('rfid.db', function (err, data) {
    if (err) throw err;
    send_response(data, {'Content-Type': 'text/plain;charset=UTF-8'});
  });
}


var do_camera = function(send_response, request_body, request_headers, time){
  var imageBuffer = new Buffer(request_body);
  require('fs').writeFile("picture.jpg", imageBuffer , function(err){
    if (err) throw err;
  });
  send_response(new Buffer("legal"), {'Content-Type': 'text/plain;charset=UTF-8'});
};

var do_accel = function(send_response, request_body, request_headers, time){
  var accel_data = JSON.parse(request_body.toString());
  var check = false;
  if(accel_data[0].n ===0){
    require('fs').writeFile('accel.db','',function(err,data){if(err)throw err;});
  }
  require('fs').readFile('accel.db', function(err,data){
    if (err) throw err;
    else{
      if(data.length ===0){
        var accelOBJ = accel_data;
      }
      else{
        var accelOBJ = JSON.parse(data.toString());
        accelOBJ = accelOBJ.concat(accel_data);   
        }
      for(var i=0;i<accel_data.length;i++){
        var cal = accel_data[i].x*accel_data[i].x + accel_data[i].y*accel_data[i].y + accel_data[i].z*accel_data[i].z
        var cal = Math.sqrt(cal);
        console.log(cal);
        if(cal>1.1){
          check = true;
          console.log("move");
          break;
        }
      }
      if(check){
        send_response(new Buffer("legal"), {'Content-Type': 'text/plain;charset=UTF-8'});
      }
      else{
        send_response(new Buffer("OK"), {'Content-Type': 'text/plain;charset=UTF-8'});
      }
      require('fs').writeFile('accel.db', JSON.stringify(accelOBJ), function(err,data){
              if(err) throw err;});
      }
    });
};
/*
var do_audio = function(send_response, request_body, request_headers, time){
  send_response(request_body, {'Content-Type': 'text/plain;charset=UTF-8'});
};
*/
var do_rfid = function(send_response, request_body, request_headers, time){
  var rfid_data = JSON.parse(request_body.toString());

  require('fs').readFile('rfid.db', function(err,data){
    if (err) throw err;
    else{

      if(data.length ===0){
        var rfidOBJ = new Array;
        rfidOBJ[0] = rfid_data;
        send_response(new Buffer("legal"), {'Content-Type': 'text/plain;charset=UTF-8'});
      }
      else{
        var rfidOBJ = JSON.parse(data.toString());
        rfidOBJ[rfidOBJ.length] = rfid_data;
        
        send_response(new Buffer("legal"), {'Content-Type': 'text/plain;charset=UTF-8'});
    }
    require('fs').writeFile('rfid.db', JSON.stringify(rfidOBJ), function(err,data){
          if(err) throw err;});  
  }
});
};


var do_climate = function(send_response, request_body, request_headers, time){
  var climate_data = JSON.parse(request_body.toString());
  var check = 0;
  if(climate_data[0].n===0){
    require('fs').writeFile('climate.db','',function(err,data){if(err)throw err;});
  }
  require('fs').readFile('climate.db', function(err,data){
    if (err) throw err;
    else{
      if(data.length ===0){
        climateOBJ = climate_data;
      }
      else{
        var climateOBJ = JSON.parse(data.toString());
        climateOBJ = climateOBJ.concat(climate_data);
        
      }
      require('fs').writeFile('climate.db', JSON.stringify(climateOBJ), function(err,data){
        if(err) throw err;
        }); 

    }
  });
  for(var i=0;i<climate_data.length;i++){
    if(climate_data[i]["Degrees"]>91){
      check = 1;
      break;
    }
    else if(climate_data[i]["Degrees"]<89){
      check = 2
      break;
    }
  }
  if(check===1){
    send_response(new Buffer("hot"), {'Content-Type': 'text/plain;charset=UTF-8'});
  }
  else if(check===2){
    send_response(new Buffer("cold"), {'Content-Type': 'text/plain;charset=UTF-8'});
  }
  else{
    send_response(new Buffer("OK"), {'Content-Type': 'text/plain;charset=UTF-8'});
  }
}
httpserver.run(configs);
