import React from 'react';
import {Meteor} from 'meteor/meteor';
import ReactDOM from 'react-dom';
import {Route, Router, browserHistory, indexRoute } from 'react-router';
import {Tracker} from 'meteor/tracker';

import Signup from '../imports/ui/Signup';
import Login from '../imports/ui/Login';
import Link from '../imports/ui/Link';
import NotFound from '../imports/ui/NotFound';

const unauthenticatedPages = ['/','/signup'];
const authenticatedPages = ['/links'];

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Login} />
    <Route path='/signup' component={Signup} />
    <Route path='/links' component={Link} />
    <Route path='*' component={NotFound} />
  </Router>
)

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const pathname = browserHistory.getCurrentLocation().pathname;

  const isUnauthenicatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if ( isUnauthenicatedPage && isAuthenticated ) {
    browserHistory.push('/links');
  } else if ( isAuthenticatedPage && !isAuthenticated ) {
    browserHistory.push('/');
  }

  console.log('is loggged in? ', isAuthenticated);
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
