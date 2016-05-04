import React, { Component } from 'react';

import './UsersPage.css';

class UsersPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {usersdata:[]};
  }

  handler(data){
    this.setState({usersdata:data})
  }

  componentDidMount() {
    fetch('/api/users')
    .then(function (response) {
      console.log(response.body);
        return response.json();
    })
    .then(this.handler.bind(this))
  }

  createUser(data){
    console.log(data);
    return(
        <UserIcon user={data}/>
      );
  }

  render() {
    return (      

      
    <div className="container">

        <div className="row">

            <div className="col-lg-12">
                <h1 className="page-header">User Gallery</h1>
            </div>
            <div>
            {this.state.usersdata.map(this.createUser,this)}
            </div>
        </div>
    </div>
    );
  }
}

class UserIcon extends Component {
  constructor(props, context) {
    super(props, context);
  }

  handler(data){
    this.setState({usersdata:data})
  }
  render(){
    const user = this.props.user;

    return(
        <div className="col-lg-3 col-md-4 col-xs-6 thumb">
          <h2>{user.name}</h2>
            <a className="thumbnail" href={'users/'+user.name}>
                <img className="img-responsive" src={user.img} alt=""/>
            </a>
        </div>
      );
  }

}
export default UsersPage;
