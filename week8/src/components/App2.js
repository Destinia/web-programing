import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  };

  render() {
    return (
      <div className="wrapper">
    <div className="box">
        <div className="row row-offcanvas row-offcanvas-left">
            <div className="column col-sm-12 col-xs-12" id="main">
                <div className="navbar navbar-blue navbar-static-top">  
                    <div className="navbar-header">
                      <button className="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-collapse">
                        <span className="sr-only">Toggle</span>
                        <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                      </button>
                      <a href="/" className="navbar-brand logo">f</a>
                    </div>
                    <nav className="collapse navbar-collapse" role="navigation">
                    <form className="navbar-form navbar-left">
                        <div className="input-group input-group-sm" >
                          <input type="text" className="form-control" placeholder="Search" name="srch-term" id="srch-term"/>
                          <div className="input-group-btn">
                            <button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
                          </div>
                        </div>
                    </form>
                    <ul className="nav navbar-nav">
                      <li>
                        <a href="/"><i className="glyphicon glyphicon-home"></i> Home</a>
                      </li>
                      <li>
                        <a role="button" data-toggle="modal"><i className="glyphicon glyphicon-plus"></i> Post</a>
                      </li>
                      <li>
                        <a ><span className="badge">badge</span></a>
                      </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                      <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="glyphicon glyphicon-user"></i></a>
                        <ul className="dropdown-menu">
                          <li><a href="">More</a></li>
                          <li><a href="">More</a></li>
                          <li><a href="">More</a></li>
                          <li><a href="">More</a></li>
                          <li><a href="">More</a></li>
                        </ul>
                      </li>
                    </ul>
                    </nav>
                </div>
                <div className="padding">
                  <div className="full col-sm-9">
                    <div className="row">
                        <div className="col-sm-12">
                          {this.props.children}
                        </div>
                    </div>
                  </div>
                </div>
            </div>

          
        </div>
    </div>
</div>

    );
  }
}
