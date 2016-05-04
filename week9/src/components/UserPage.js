import React, { Component, PropTypes } from 'react';
import '../styles.css'

class UserPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {"name":this.props.params.username,"user":{}};
  }

  handler(data){
    console.log(data);
    this.setState({user:data});
  }

  componentDidMount() {
    fetch('/api/users/'+this.state.name)
    .then(function (response) {
      console.log(response.body);
        return response.json();
    })
    .then(this.handler.bind(this))
    .catch(function (err){
        console.log(err);
    })
  }


  render() {

    const user = this.state.user;
    console.log(user);

    // html -> jsx
    return (
      <div>
       <div className="col-sm-5">
        <div className="panel panel-default">
          <h2>{user.name}</h2>
          <div className="panel-thumbnail"><img src={user.img} className="img-responsive"/></div>
          <div className="panel-body">
            <p className="lead">{name}</p>
            <p>45 Followers, 13 Posts</p>
            
            <p>
              <img src="https://lh3.googleusercontent.com/uFp_tsTJboUY7kue5XAsGA=s28" width="28px" height="28px"/>
            </p>
          </div>
        </div>

     
        <div className="panel panel-default">
          <div className="panel-heading"><a href="#" className="pull-right">View all</a> 
          <img src="http://1img.org/wp-content/uploads/2015/09/facebook-icon-9.jpg" width="30px" height="30px"/><h4>Intro</h4>
          </div>
            <div className="panel-body">
              <div className="list-group">
                <a href="http://bootply.com/tagged/modal" className="list-group-item">Studied at National Taiwan University</a>
                <a href="http://bootply.com/tagged/datetime" className="list-group-item">Lives in Taipei,Taiwan</a>
                <a href="http://bootply.com/tagged/datatable" className="list-group-item">From Tainan,Taiwan</a>
              </div>
            </div>
        </div>
     

     
        <div className="panel panel-default">
           <div className="panel-heading"><a href="#" className="pull-right">View all</a>
            <img src="http://news.wowdigi.com/wp-content/uploads/2013/10/aperture-icon.png" width="30px" height="30px"/><h4>Photo</h4>
            </div>
            <div className="container-fluid">
              <div className="square img_1-1">
              </div>
              <div className="square img_1-2">
              </div>
              <div className="square img_1-3">
              </div>
              
              <div className="square img_2-1">
              </div>
              <div className="square img_2-2">
              </div>
              <div className="square img_2-3">
              </div>
              
              <div className="square img_3-1">
              </div>
              <div className="square img_3-2">
              </div>
              <div className="square img_3-3">
              </div>
            </div>
        </div>
     
        <div className="panel panel-default">
          <div className="panel-heading"><h4>What Is Bootstrap?</h4></div>
          <div className="panel-body">
            Bootstrap is front end frameworkto build custom web applications that are fast, responsive &amp; intuitive. It consist of CSS and HTML for typography, forms, buttons, tables, grids, and navigation along with custom-built jQuery plug-ins and support for responsive layouts. With dozens of reusable components for navigation, pagination, labels, alerts etc..                          </div>
        </div>

        
     
    </div>
    
    <div className="col-sm-7">
         
        <div className="well"> 
             <form className="form-horizontal" role="form">
              <h4>What's New</h4>
               <div className="form-group" >
                <textarea className="form-control" placeholder="Update your status"></textarea>
              </div>
              <button className="btn btn-primary pull-right" type="button">Post</button><ul className="list-inline"><li><a href=""><i className="glyphicon glyphicon-upload"></i></a></li><li><a href=""><i className="glyphicon glyphicon-camera"></i></a></li><li><a href=""><i className="glyphicon glyphicon-map-marker"></i></a></li></ul>
            </form>
        </div>
    
         <div className="panel panel-default">
           <div className="panel-heading"><a href="#" className="pull-right">View all</a> <h4>Bootply Editor &amp; Code Library</h4></div>
            <div className="panel-body">
              <p><img src="//placehold.it/150x150" className="img-circle pull-right"/> <a href="#">The Bootstrap Playground</a></p>
              <div className="clearfix"></div>
              <hr/>
              Design, build, test, and prototype using Bootstrap in real-time from your Web browser. Bootply combines the power of hand-coded HTML, CSS and JavaScript with the benefits of responsive design using Bootstrap. Find and showcase Bootstrap-ready snippets in the 100% free Bootply.com code repository.
            </div>
         </div>
      
         <div className="panel panel-default">
           <div className="panel-heading"><a href="#" className="pull-right">View all</a> <h4>Stackoverflow</h4></div>
            <div className="panel-body">
              <img src="//placehold.it/150x150" className="img-circle pull-right"/> <a href="#">Keyword: Bootstrap</a>
              <div className="clearfix"></div>
              <hr/>
              
              <p>If you're looking for help with Bootstrap code, the <code>twitter-bootstrap</code> tag at <a href="http://stackoverflow.com/questions/tagged/twitter-bootstrap">Stackoverflow</a> is a good place to find answers.</p>
              
              <hr/>
              <form>
              <div className="input-group">
                <div className="input-group-btn">
                <button className="btn btn-default">+1</button><button className="btn btn-default"><i className="glyphicon glyphicon-share"></i></button>
                </div>
                <input type="text" className="form-control" placeholder="Add a comment.."/>
              </div>
              </form>
              
            </div>
         </div>

         <div className="panel panel-default">
           <div className="panel-heading"><a href="#" className="pull-right">View all</a> <h4>Portlet Heading</h4></div>
            <div className="panel-body">
              <ul className="list-group">
              <li className="list-group-item">Modals</li>
              <li className="list-group-item">Sliders / Carousel</li>
              <li className="list-group-item">Thumbnails</li>
              </ul>
            </div>
         </div>
      
         <div className="panel panel-default">
          <div className="panel-thumbnail"><img src="/assets/example/bg_4.jpg" className="img-responsive"/></div>
          <div className="panel-body">
            <p className="lead">Social Good</p>
            <p>1,200 Followers, 83 Posts</p>
            
            <p>
              <img src="https://lh6.googleusercontent.com/-5cTTMHjjnzs/AAAAAAAAAAI/AAAAAAAAAFk/vgza68M4p2s/s28-c-k-no/photo.jpg" width="28px" height="28px"/>
              <img src="https://lh4.googleusercontent.com/-6aFMDiaLg5M/AAAAAAAAAAI/AAAAAAAABdM/XjnG8z60Ug0/s28-c-k-no/photo.jpg" width="28px" height="28px"/>
              <img src="https://lh4.googleusercontent.com/-9Yw2jNffJlE/AAAAAAAAAAI/AAAAAAAAAAA/u3WcFXvK-g8/s28-c-k-no/photo.jpg" width="28px" height="28px"/>
            </p>
          </div>
        </div>      
    </div>
  </div>
    );
  }
}
export default UserPage;