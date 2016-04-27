import React, { Component, PropTypes } from 'react';
import MessageItem from './MessageItem';
import ThreadItem from './ThreadItem';
import userdata from '../userdata';

class ChatApp extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props,context){
    super(props,context);
    var d = new Date();
    var time = d.getHours().toString() + ':' + d.getMinutes().toString();
    this.state = {
      UserData:userdata,
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

  handleImageClick(index){
    const {router} = this.context;
    router.push('/users/'+this.state.UserData[index].name);
  }
  
  createThread(data,i){
    return(
       <ThreadItem user={data} key={i} onClick={this.handleThreadClick.bind(this,i)} onImageClick={this.handleImageClick.bind(this,i)}/>
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
