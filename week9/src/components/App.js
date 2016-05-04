import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-custom">
          <div className="container-fluid">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-9"
                aria-expanded="false"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand logo" href="/">F</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-9">
              <ul className="nav navbar-nav">
                <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
                <li><Link to="/chat" activeClassName="active">Chat</Link></li>
                <li><Link to="/posts" activeClassName="active">Posts</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        {/* this will render the child routes */}
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
