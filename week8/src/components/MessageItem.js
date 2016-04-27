import React, { Component, PropTypes } from 'react';

class MessageItem extends React.Component {
  render() {
    return (
            <div className={this.props.className}>
                <span>{this.props.text}</span>
            </div>

    );
  }
}

export default MessageItem;