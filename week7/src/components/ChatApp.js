import React, { Component, PropTypes } from 'react';
import MessageItem from './MessageItem';
import ThreadItem from './ThreadItem';

class ChatApp extends React.Component {
  constructor(props){
    super(props);
    var d = new Date();
    var time = d.getHours().toString() + ':' + d.getMinutes().toString();
    var tempuser1 = {index:0,name:"Allen",img:"http://lorempixel.com/50/50/people/1",msg:[{sender:false,text:"aa"},{sender:false,text:"hey"},{sender:true,text:"why?"}],time:time};
    var tempuser2 = {index:1,name:"Elsa",img:"http://lorempixel.com/50/50/people/9",msg:[{sender:false,text:"...."},{sender:false,text:"???"},{sender:true,text:"!!!"}],time:time};
    var tempuser3 = {index:2,name:"Riviera",img:"https://scontent-tpe1-1.xx.fbcdn.net/hphotos-xat1/v/t1.0-0/p206x206/12189021_963835170351544_8961237787065993961_n.jpg?oh=9b76c298c5bd32032f29c32c4a4a1c48&oe=5796732D",msg:[{sender:false,text:"WTF"},{sender:false,text:"等等打球"},{sender:true,text:"球你帶"}],time:time};
    this.state = {
      UserData:[tempuser1,tempuser2,tempuser3],
      cur_user:0,
      input:""
    }
    
  }

  
  handleChange(e){
    this.setState({input:e.target.value});
  }
  
  handleAdd (e){
    if(e.which == 13){
      var d = new Date();
      var time = d.getHours().toString() + ':' + d.getMinutes().toString();
      console.log("aaa");
      e.preventDefault();
      var user = this.state.UserData[this.state.cur_user];
      user.msg.push({sender:true,text:this.state.input});
      user.time = time;
      var users = this.state.UserData;
      users[user.index] = user;
      
      this.setState({input:'',UserData:users});
    }
  }
  
  handleThreadClick(index){
    this.setState({cur_user:index});
  }
  
  createThread(data,i){
    return(
       <ThreadItem user={data} key={i} onClick={this.handleThreadClick.bind(this,i)}/>
    );
  }
  
  createMessage(data,i){
    if(data.sender){
      return(
         <MessageItem className={"message-item message-from-me"} text={data.text}/>
      );
    }
    else{
      return(
         <MessageItem className={"message-item message-from-other"} text={data.text}/>
      );
    }
  }
    

 
  
  render() {
    // html -> jsx
    
    //create some user data
    const userdata = this.state.UserData;
    const cur_index = this.state.cur_user;


    return (
      
      <div className="chat-app clearfix">
        <div className="chat-app_left">
          <div className="heading">
            <h3 className="messenger-title">Messager</h3>
          </div>
          <div className="thread-list">
            <div className="thread-list" >{userdata.map(this.createThread,this)}</div>
          </div>
        </div>
        <div className="chat-app_right">
           <div className="heading">
              <div className="current-target">{userdata[cur_index].name}</div>
           </div>
           <div className="message-list">
             {userdata[cur_index].msg.map(this.createMessage,this)}
           </div>
           <div class="footer">
            <input className="new-message" type="text" onChange={this.handleChange.bind(this)} onKeyPress={this.handleAdd.bind(this)} value={this.state.input}/>
           </div>
        </div>
      </div>
    );
  }
}

export default ChatApp;
