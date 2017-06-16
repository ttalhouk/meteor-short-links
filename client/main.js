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
const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/links');
  }
}
const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  }
}

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Login} onEnter={onEnterPublicPage}/>
    <Route path='/signup' component={Signup} onEnter={onEnterPublicPage}/>
    <Route path='/links' component={Link} onEnter={onEnterPrivatePage}/>
    <Route path='*' component={NotFound} />
  </Router>
)

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const pathname = browserHistory.getCurrentLocation().pathname;

  const isUnauthenicatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if ( isUnauthenicatedPage && isAuthenticated ) {
    browserHistory.replace('/links');
  } else if ( isAuthenticatedPage && !isAuthenticated ) {
    browserHistory.replace('/');
  }

  console.log('is loggged in? ', isAuthenticated);
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
