console.log('Hello JavaScript!');

var http_post = function (where, text_to_send, callback) {
  if (typeof where !== 'string') throw TypeError();
  if (typeof text_to_send !== 'string') throw TypeError();
  if (typeof callback !== 'function') throw TypeError();
  // temp = JSON.parse('{"nickname":"","emoji":6,"message":""}');
  //console.log(temp["emoji"]);
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



var input_textarea_elm = document.getElementById('user-input-area');
var log_textarea_elm = document.getElementById('log-area');
var nickname_textarea_elm = document.getElementById('nickname-input-area');
//var send_button_elm = document.getElementById('user-input-send-btn');
var submit_button_elm = document.getElementById('user-input-submit-btn');
var readall_button_elm = document.getElementById('user-input-readall-btn');
var emoji_radiobutton_elm = document.getElementById('form_name');
var selector_elm = document.getElementById('nickname_selector');
var cleanup_elm = document.getElementById('user-input-cleanup-btn');
var signup_elm = document.getElementById('user-input-signup-btn');
var login_elm = document.getElementById('user-input-login-btn');

selector_elm[0] = new Option('-----',0,true,false);


//var emoji_elm = '"'+'6'+'"';
//var nickname_elm = ;

/*send_button_elm.addEventListener('click', function () {
  var user_input = input_textarea_elm.value;
  input_textarea_elm.value = '';
  input_textarea_elm.focus();
  send_to_server(user_input);
  //console.log(emoji_radiobutton_elm);
});*/

submit_button_elm.addEventListener('click',function(){
  var emoji = -1;
  for(var i =0;i<emoji_radiobutton_elm.emoji.length;i=i+1){
    if(emoji_radiobutton_elm.emoji[i].checked)
      emoji =i;
  }
  send_json(JSON.stringify({"nickname":nickname_textarea_elm.value,"emoji":emoji,"message":input_textarea_elm.value}));
  input_textarea_elm.value = '';
  input_textarea_elm.focus();
//  nickname_textarea_elm.value = '';
//  nickname_textarea_elm.focus();
  
  //send_json('{"nickname":'+nickname+',"emoji":'+emoji+',"message":'+message+'}');
  //send_json('allen');
});

readall_button_elm.addEventListener('click',function(){
  http_post('/read_all','' ,data_from_server_callback_readall);
});

cleanup_elm.addEventListener('click',function (){
  http_post('/cleanup','',data_from_server_callback_cleanup);
  http_post('/nickname','',data_from_server_callback_list);
});

selector_elm.addEventListener('change',function (){
  console.log(selector_elm.value);
  http_post('/filter',selector_elm.value,data_from_server_callback_readall);
  
});

//signup 
signup_elm.addEventListener('click',function(){
  var signup = window.open('/signup.html',"signup window","width=400, height=400");
  signup.console.log("hello");
//  signup.document.write("<p>: please enter you username"  + "</p><br>\n");
  /*signup.document.write("username: " + "<input type="+"'Text'" +"id="+"'username-input-area'" +"><br>");//+"style= " +"'width:100px;height:20px;'" + "autofoucus ></textarea>");
//  signup.document.write("<p>: please enter you password"  + "</p><br>\n");
  signup.document.write("password: " + "<input type="+"'Password'" +" id="+"'password-input-area'" +"maxlength="+"'12'"+">") ;//+"style= " +"'width:100px;height:20px;'" + "autofoucus ></textarea>");
  signup.document.write("<button id="+"'signup-submit-btn'>"+"sumuit</button>");*/
  /*
  var username = signup.document.getElementById('username-input-area');
  var password = signup.document.getElementById('password-input-area');
  var submit = signup.document.getElementById('signup-submit-btn');
  console.log(typeof submit);
  submit.addEventListener('click',function(){
    signup.console.log('submit click');
    var reg_nickname =  /^[a-z0-9]{3,10}$/;
    var reg_password =  /^[a-z0-9]{5,12}$/;
    if(!reg_nickname.test(username.value)){signup.alert("username fomat error!!!");return;}
    if(!reg_password.test(password.value)){signup.alert("password fomat error!!!");return;}
    var jsonobj = {"username":username.value,"password":password.value};
    var jsonstr = JSON.stringify(jsonobj);
    signup.console.log(jsonstr);
    http_post('/signup',jsonstr,function (result){
      var res_json = JSON.parse(result);
      if(res_json.message = "OK") signup.close();
      else 
        signup.alert("same username" + res_json.message +"!!");
    });
  });
  */

  //signup.document.write("<h2>Your password:</h2>
  //      <textarea id='password-input-area' style= 'width:100px;height:20px;' autofoucus ></textarea>");
});

login_elm.addEventListener('click',function(){
  var login = window.open('/login.html',"login window","width=400, height=400");
  login.onbeforeunload = function () {
  http_post('/userdata','',function(result){
    nickname_textarea_elm.value = result;
  });
  }
});

var send_to_server = function (text_to_send) {
  if (typeof text_to_send !== 'string') throw TypeError();
  http_post('/echo', text_to_send, data_from_server_callback);
};

var send_json = function (text_to_send) {
  if (typeof text_to_send !== 'string') throw TypeError();
  http_post('/submit', text_to_send, data_from_server_callback_submit );
  //http_post('/nickname','',data_from_server_callback_list);
};
var data_from_server_callback = function (result) {
  log_textarea_elm.value += '>>> [' + result + ']\n';
};

var data_from_server_callback_submit = function (result) {
  console.log(typeof result);
  console.log("here");

  var jsonobj = JSON.parse(result);
  console.log(result);
  selector_elm.length = jsonobj.nick_arr.length+1;
  for(var i =0;i<jsonobj.nick_arr.length;i++){
    selector_elm.options[i+1].text = jsonobj.nick_arr[i];
  }
    

  if(jsonobj.message==='OK'){
    log_textarea_elm.textContent = '';
    log_textarea_elm.textContent +='received\n';}
  else{
    alert(jsonobj.message+" format error!!!");
    return;
  } 
};

var data_from_server_callback_list = function (result){
  var jsonobj = JSON.parse(result);

  //default option
  //selector_elm[0] = new Option('-----',0,true,false);
  if(jsonobj.nick_arr){
    selector_elm.length = jsonobj.nick_arr.length+1;
    for(var i =0;i<jsonobj.nick_arr.length;i=i+1){
      selector_elm.options[i+1].text = jsonobj.nick_arr[i];
    }
  }

};

var data_from_server_callback_readall = function (result){
  console.log(typeof result);
  
  var jsonOBJ = JSON.parse(result);
  console.log(jsonOBJ);
  log_textarea_elm.textContent = '';
  if(jsonOBJ){
    console.log('wdewfefqewfw');
    var content_array = new Array(jsonOBJ.length);
    for(var i =0;i<jsonOBJ.length;i+=1){
      //x(user_profile);
      content_array[i] = jsonOBJ[i]["time"] + ' ' + jsonOBJ[i]["nickname"] + ' '  + jsonOBJ[i]["message"];
      switch(jsonOBJ[i]["emoji"]){
      case 0 :
      log_textarea_elm.innerHTML += ('<div>'+content_array[i]+'&#x1F60A;'+'</div>');
      break;

      case 1 :
      log_textarea_elm.innerHTML += ('<div>'+content_array[i]+'&#x1F494;'+'</div>');
      break;

      case 2 :
      log_textarea_elm.innerHTML += ('<div>'+content_array[i]+'&#x1F440;'+'</div>');
      break;

      case 3 :
      log_textarea_elm.innerHTML += ('<div>'+content_array[i]+'&#x1F48B;'+'</div>');
      break;


    }
     

 //    &#x1F60A;
 //    &#x1F494;
  //   &#x1F440;
 //    &#x1F48B;
      //log_textarea_elm.textContent += jsonOBJ[i]["time"] + ' ' + jsonOBJ[i]["nickname"] + ' '  + jsonOBJ[i]["message"]  +'\n';
      //x(jsonOBJ[i]["emoji"]);
    }
  }
  
};

var x = function (pic_src){
//src = '<img src="http://cfile26.uf.tistory.com/image/2522F535538E804C29A143"/>';
  $("#log-area").append(pic_src);
  };

var data_from_server_callback_cleanup = function (result){
  console.log(typeof result);
  if(result==="OK"){
    log_textarea_elm.textContent = '';
    console.log("clean up");}

};

//default request
http_post('/nickname','',data_from_server_callback_list);
