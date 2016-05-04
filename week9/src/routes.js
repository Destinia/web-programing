import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import UsersPage from './components/UsersPage';
import UserPage from './components/UserPage';
import SingleUserPage from './components/SingleUserPage';
import NotFoundPage from './components/NotFoundPage';
import App from './components/App2';


export default (
  <Route path="/" component={App}>
    <IndexRedirect to="/users" />
    <Route path="users" component={UsersPage}/>
    <Route path="users/:username" component={UserPage}/>
    <Route path="*" component={NotFoundPage} />
  </Route>
);
