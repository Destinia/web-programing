var httpserver = require('./httpserver.js');
var user;


var configs = function (set_port, set_hostname, set_handler) {
  set_port(2015);
  set_hostname('127.0.0.1');
  set_handler('GET /', do_output_html);
  set_handler('GET /index.html', do_output_html);
  set_handler('GET /signup.html', do_output_signup);
  set_handler('GET /login.html', do_output_login);
  set_handler('GET /main.css', do_output_css);
  set_handler('GET /main.js', do_output_js);
  set_handler('GET /jquery.js', do_output_jquery);
  set_handler('GET /favicon.ico', do_output_favicon);
  set_handler('POST /echo', do_echo);
  set_handler('POST /submit', do_submit);
  set_handler('POST /read_all', do_readall);
  set_handler('POST /cleanup', do_cleanup);
  set_handler('POST /filter',do_filter);
  set_handler('POST /nickname',do_nickname);
  set_handler('POST /signup',do_signup);
  set_handler('POST /login',do_login);
    set_handler('POST /userdata',do_user);
};

var do_output_html = function (send_response) {
  require('fs').readFile('static_files/index.html', function (err, data) {
    if (err) throw err;
    send_response(data, {'Content-Type': 'text/html; charset=utf-8'});
  });
};

var do_output_signup = function (send_response) {
  require('fs').readFile('static_files/signup.html', function (err, data) {
    if (err) throw err;
    send_response(data, {'Content-Type': 'text/html; charset=utf-8'});
  });
};

var do_output_login = function (send_response) {
  require('fs').readFile('static_files/login.html', function (err, data) {
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

var do_output_jquery = function (send_response) {
  require('fs').readFile('static_files/jquery.js', function (err, data) {
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



// Echo back every bytes received from the client
var do_echo = function (send_response, request_body, request_headers) {
  var content_type_default = 'application/octet-stream';
  var content_type = request_headers['content-type'] || content_type_default;
  //console.log(content_type);
  //var JSONobj = jQuery.parseJSON(request_body.toString());
  //var obj = jQuery.parseJSON( '{ "name": "John" }' );
  send_response(request_body, {'Content-Type': content_type});
  //for (var header_name of Object.keys(request_headers))
  //        console.log(header_name+" "+request_headers[header_name]);
  //var arr = JSON.parse(request_body.toString());
  //console.log(arr);
  //console.log((JSON.parse(arr).isObject));
  //console.log(arr.isObject);
  //console.log(arr.isString);
  //console.log(arr[0].nickname);
  //for(var i = 0 ;i<arr.length;i+=1)
  //    console.log(arr[i]);
  //console.log({"name":"jack"});
  //var str = "'";
  //str = str.concat(request_body.toString());
  //str = str.concat("'");
  console.log(request_body.toString());
  var json = JSON.parse(request_body.toString());
  console.log(typeof json);

  //  for (var header_name of Object.keys(json))
  //      console.log(header_name+" "+json[header_name]);
  //console.log(str);
  //console.log(str === '{"nickname":"","emoji":6,"message":""}');
  //console.log(typeof str);
  //var json = JSON.parse('{"nickname":"","emoji":6,"message":""}');
  //console.log(json);
  
};

var do_submit = function (send_response, request_body, request_headers, time) {
  var content_type_default = 'application/octet-stream';
  var content_type = request_headers['content-type'] || content_type_default;

  console.log("11111");
  var jsoncheck = JSON.parse(request_body.toString());
  var reg_nickname =  /^[a-z0-9]{3,10}$/;
  var nick_arr = new Array;
  //nickname check
  
  if(!reg_nickname.test(jsoncheck["nickname"])){
    var json_err = JSON.stringify({"message":"nickname"});
    console.log(json_err);
    send_response(new Buffer(json_err),{'Content-Type': content_type});
    console.log("here");
    return ;
  }
  if(jsoncheck["emoji"]<0 || jsoncheck["emoji"]>3){
    var json_err = JSON.stringify({"message":"emoji"});
    console.log(json_err);
    send_response(new Buffer(json_err),{'Content-Type': content_type});
    return ;
  }
  if(jsoncheck["message"].length === 0){
    var json_err = JSON.stringify({"message":"message"});
    console.log(json_err);
    send_response(new Buffer(json_err),{'Content-Type': content_type});
    return ;
  }
  

  require('fs').readFile('nickname.db',function (err, data){
    if(err) throw err;
    else {
      if(data.toString().length === 0 ){
        nick_arr[0] = jsoncheck["nickname"];
      }
      else{
        nick_arr = Array.prototype.slice.call(JSON.parse(data.toString()));
        for(var i = 0;i<nick_arr.length;i=i+1){
          if(jsoncheck["nickname"] === nick_arr[i])
            break;
          else if(i === nick_arr.length-1)
            nick_arr[nick_arr.length] = jsoncheck["nickname"];
        }
      }
      var json_str = JSON.stringify({"message":"OK","nick_arr":nick_arr});
      console.log(json_str);
      send_response(new Buffer(json_str),{'Content-Type': content_type});//new Buffer(JSON.stringify({"message":"OK"/*,"nick_arr":nick_arr*/})),{'Content-Type': content_type});

      require('fs').writeFile('nickname.db',JSON.stringify(nick_arr),function (err, data){
          if(err) throw err;
          else
            console.log("success write");
        });

    }


    });
      

  require('fs').readFile('data.db',function (err, data) {
    if (err) throw err;
    else{
          if(data.length === 0){
            var jsonOBJ = new Array;
            jsonOBJ[0] = jsoncheck;
            jsonOBJ[0]["time"] = time;
          }
          else{
            var jsonOBJ = JSON.parse(data.toString());
            jsonOBJ[jsonOBJ.length] = jsoncheck;
            jsonOBJ[jsonOBJ.length-1]["time"] = time; 
          }

        require('fs').writeFile('data.db',JSON.stringify(jsonOBJ),function (err, data){
          if(err) throw err;
        });
      
    }
  });
};

var do_readall = function (send_response, request_body, request_headers){
  var content_type_default = 'application/octet-stream';
  var content_type = request_headers['content-type'] || content_type_default;
  require('fs').readFile('data.db',function (err, data) {
    if (err) throw err;
    else{
      
        send_response(data, {'Content-Type': content_type});

    }
  });
};

var do_cleanup = function (send_response, request_body, request_headers){
  var content_type_default = 'application/octet-stream';
  var content_type = request_headers['content-type'] || content_type_default;
  log_textarea_elm.textContent = '';
  require('fs').writeFile('data.db','',function (err,data) {
    if(err) throw err;
    else 
      {
        require('fs').writeFile('nickname.db','',function (err,data) {
          if(err) {throw err;console.log('error2');}
          else 
            send_response(new Buffer("OK"),{'Content-Type': content_type});
          });
      }
  });
  
};

var do_nickname = function (send_response, request_body, request_headers){
  var content_type_default = 'application/octet-stream';
  var content_type = request_headers['content-type'] || content_type_default;
  var nick_arr = new Array;
  require('fs').readFile('nickname.db',function (err, data){
    if(err) throw err;
    else {
      if(data.toString().length === 0 ){
        nick_arr = null;
      }
      else{
        nick_arr = Array.prototype.slice.call(JSON.parse(data.toString()));
      }
      var json_str = JSON.stringify({"nick_arr":nick_arr});
      send_response(new Buffer(json_str),{'Content-Type': content_type});
    }
    });

};

var do_filter = function (send_response,request_body,request_headers){
  var username = request_body.toString();
  var content_type_default = 'application/octet-stream';
  var content_type = request_headers['content-type'] || content_type_default;
  console.log("filter");

  require('fs').readFile('data.db',function (err, data) {
    if (err) throw err;
    else{
      var jsonobj = JSON.parse(data.toString());
      var send_obj = new Array;
      for (var i =0; i<jsonobj.length;i=i+1){
        if(jsonobj[i].nickname === username)
          send_obj.push(jsonobj[i]);
      }
      var json_str = JSON.stringify(send_obj);
      console.log(json_str);
      send_response(new Buffer(json_str), {'Content-Type': content_type});

    }
  });
};

var do_signup = function (send_response, request_body, request_headers){
  var jsonobj = JSON.parse(request_body.toString());
  var content_type_default = 'application/octet-stream';
  var content_type = request_headers['content-type'] || content_type_default;

  var nick_arr = new Array;
  require('fs').readFile('user.db',function (err, data){
    if(err) throw err;
    else {
      if(data.toString().length === 0 ){
      }
      else{
        console.log(data);
        nick_arr = Array.prototype.slice.call(JSON.parse(data.toString()));
      }
      //console.log(nick_arr);
      var check = true;
      for(var i = 0;i<nick_arr.length;i++){
        if(nick_arr[i].username === jsonobj.username){
          console.log(nick_arr[i].username);
          send_response(new Buffer("username is used!!!"),{'Content-Type': content_type});
          check = false;
        } 
      }
      if(check){
      nick_arr.push(jsonobj);
      send_response(new Buffer("OK"),{'Content-Type': content_type});
      require('fs').writeFile('user.db',JSON.stringify(nick_arr),function (err, data){
          if(err) throw err;
          else
            console.log("success write");
        });
      }
    }
    });  
};

var do_login = function (send_response, request_body, request_headers){
  var jsonobj = JSON.parse(request_body.toString());
  var content_type_default = 'application/octet-stream';
  var content_type = request_headers['content-type'] || content_type_default;

  var nick_arr = new Array;
  require('fs').readFile('user.db',function (err, data){
    if(err) throw err;
    else {
      if(data.toString().length === 0 ){
      }
      else{
        console.log(data);
        nick_arr = Array.prototype.slice.call(JSON.parse(data.toString()));
      }
      //console.log(nick_arr);
      var check = true;
      for(var i = 0;i<nick_arr.length;i++){
        if(nick_arr[i].username === jsonobj.username){
          if(nick_arr[i].password === jsonobj.password){
            user = nick_arr[i].username;
            send_response(new Buffer("OK"),{'Content-Type': content_type});
            return;
          }
          else{
            console.log(nick_arr[i].username);
            send_response(new Buffer("Incorrect password!!!"),{'Content-Type': content_type});
            check = false;
            return;
          }  
        }
        else if(i===nick_arr.length-1)
          send_response(new Buffer("No username!!!"),{'Content-Type': content_type});
      } 
    }
  });  
};

var do_user = function (send_response, request_body, request_headers){
  var content_type_default = 'application/octet-stream';
  var content_type = request_headers['content-type'] || content_type_default;
  send_response(new Buffer(user),{'Content-Type': content_type});
};

httpserver.run(configs);
