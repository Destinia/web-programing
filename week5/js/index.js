"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// ChatApp: 原本的 HTML

var ChatApp = function (_React$Component) {
  _inherits(ChatApp, _React$Component);

  function ChatApp(props) {
    _classCallCheck(this, ChatApp);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    var d = new Date();
    var time = d.getHours().toString() + ':' + d.getMinutes().toString();
    var tempuser1 = { index: 0, name: "Allen", img: "http://lorempixel.com/50/50/people/1", msg: [{ sender: false, text: "aa" }, { sender: false, text: "hey" }, { sender: true, text: "why?" }], time: time };
    var tempuser2 = { index: 1, name: "Elsa", img: "http://lorempixel.com/50/50/people/9", msg: [{ sender: false, text: "...." }, { sender: false, text: "???" }, { sender: true, text: "!!!" }], time: time };
    var tempuser3 = { index: 2, name: "Riviera", img: "https://scontent-tpe1-1.xx.fbcdn.net/hphotos-xat1/v/t1.0-0/p206x206/12189021_963835170351544_8961237787065993961_n.jpg?oh=9b76c298c5bd32032f29c32c4a4a1c48&oe=5796732D", msg: [{ sender: false, text: "WTF" }, { sender: false, text: "等等打球" }, { sender: true, text: "球你帶" }], time: time };
    _this.state = {
      UserData: [tempuser1, tempuser2, tempuser3],
      cur_user: 0,
      input: ""
    };

    return _this;
  }
  /*
  createUser(name,img,msg){
    var d = new Date();
    var time = d.getHours().toString() + ':' + d.getMinutes().toString();
    var tempdata = {name:name,img:img,msg:msg,time:time};
    var allData = this.state.UserData;
    allData.push(tempdata);
    this.setState({UserData:allData});
    console.log(this.state.UserData);
  }
  AddMsg(name,newMsg){
    var allUsers = this.state.UserData;
    var user = allUsers.find(function(u){return u.name===name;});
    var index = allUsers.indexOf(user);
    user.msg.push(newMsg);
    allUsers[index] = user;
    this.setState({UserData:allUsers});   
   }
  */

  ChatApp.prototype.handleChange = function handleChange(e) {
    this.setState({ input: e.target.value });
  };

  ChatApp.prototype.handleAdd = function handleAdd(e) {
    if (e.which == 13) {
      var d = new Date();
      var time = d.getHours().toString() + ':' + d.getMinutes().toString();
      console.log("aaa");
      e.preventDefault();
      var user = this.state.UserData[this.state.cur_user];
      user.msg.push({ sender: true, text: this.state.input });
      user.time = time;
      var users = this.state.UserData;
      users[user.index] = user;

      this.setState({ input: '', UserData: users });
    }
  };

  ChatApp.prototype.handleThreadClick = function handleThreadClick(index) {
    this.setState({ cur_user: index });
  };

  ChatApp.prototype.createThread = function createThread(data, i) {
    return React.createElement(ThreadItem, { user: data, key: i, onClick: this.handleThreadClick.bind(this, i) });
  };

  ChatApp.prototype.createMessage = function createMessage(data, i) {
    if (data.sender) {
      return React.createElement(MessageItem, { className: "message-item message-from-me", text: data.text });
    } else {
      return React.createElement(MessageItem, { className: "message-item message-from-other", text: data.text });
    }
  };

  ChatApp.prototype.render = function render() {
    // html -> jsx

    //create some user data
    var userdata = this.state.UserData;
    var cur_index = this.state.cur_user;

    return React.createElement(
      "div",
      { className: "chat-app clearfix" },
      React.createElement(
        "div",
        { className: "chat-app_left" },
        React.createElement(
          "div",
          { className: "heading" },
          React.createElement(
            "h3",
            { className: "messenger-title" },
            "Messager"
          )
        ),
        React.createElement(
          "div",
          { className: "thread-list" },
          React.createElement(
            "div",
            { className: "thread-list" },
            userdata.map(this.createThread, this)
          )
        )
      ),
      React.createElement(
        "div",
        { className: "chat-app_right" },
        React.createElement(
          "div",
          { className: "heading" },
          React.createElement(
            "div",
            { className: "current-target" },
            userdata[cur_index].name
          )
        ),
        React.createElement(
          "div",
          { className: "message-list" },
          userdata[cur_index].msg.map(this.createMessage, this)
        ),
        React.createElement(
          "div",
          { "class": "footer" },
          React.createElement("input", { className: "new-message", type: "text", onChange: this.handleChange.bind(this), onKeyPress: this.handleAdd.bind(this), value: this.state.input })
        )
      )
    );
  };

  return ChatApp;
}(React.Component);

var ThreadItem = function (_React$Component2) {
  _inherits(ThreadItem, _React$Component2);

  function ThreadItem() {
    _classCallCheck(this, ThreadItem);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  ThreadItem.prototype.render = function render() {
    var user = this.props.user;

    // html -> jsx
    return React.createElement(
      "li",
      { className: "thread-item", onClick: this.props.onClick },
      React.createElement(
        "div",
        { className: "clearfix" },
        React.createElement(
          "div",
          { className: "thread-item_left" },
          React.createElement("img", { className: "img-circle", src: user.img, width: "50", height: "50", alt: "" })
        ),
        React.createElement(
          "div",
          { className: "thread-item_right" },
          React.createElement(
            "div",
            { className: "thread-from" },
            user.name
          ),
          React.createElement(
            "div",
            null,
            React.createElement(
              "span",
              { className: "thread-content" },
              user.msg[user.msg.length - 1].text
            )
          ),
          React.createElement(
            "span",
            { className: "thread-time" },
            user.time
          )
        )
      )
    );
  };

  return ThreadItem;
}(React.Component);

var MessageItem = function (_React$Component3) {
  _inherits(MessageItem, _React$Component3);

  function MessageItem() {
    _classCallCheck(this, MessageItem);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  MessageItem.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: this.props.className },
      React.createElement(
        "span",
        null,
        this.props.text
      )
    );
  };

  return MessageItem;
}(React.Component);

ReactDOM.render(React.createElement(ChatApp, null), document.getElementById('root'));