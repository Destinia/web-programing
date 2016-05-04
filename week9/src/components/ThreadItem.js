import React, { Component, PropTypes } from 'react';

class ThreadItem extends React.Component {
  render() {
    const user = this.props.user;

    // html -> jsx
    return (
      <li className="thread-item" onClick={this.props.onClick}>
        <div className="clearfix">
          <div className="thread-item_left">
            <img className="img-circle-sticker" src={user.img} width="50" height="50" alt="" onClick={this.props.onImageClick}/>
          </div>
          <div className="thread-item_right">
            <div className="thread-from">
              {user.name}
            </div>
          <div>
              <span className="thread-content">{user.msg[user.msg.length-1].text}</span>
            </div>
            <span className="thread-time">{user.time}</span>
          </div>
        </div>
      </li>
    );
  }
}
export default ThreadItem;