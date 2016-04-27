import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import Home from './components/Home';
import ChatApp from './components/ChatApp'; 
import App from './components/App2';
import UserPage from './components/UserPage';
import NotFound from './components/NotFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/chat" component={ChatApp}/> 
    <Route path="/users/:username" component={UserPage}/>
    <Route path="*" component={NotFound}/>
  </Route>

);