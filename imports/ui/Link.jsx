import React from 'react';
import PropTypes from 'prop-types';
import {Accounts} from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor';

import {Links} from '../api/links';
import LinksList from './LinksList';

export default class Link extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    }
  }
  onSubmit (e) {
    e.preventDefault();

    const url = this.refs.url.value.trim();
    if (url) {
      Meteor.call('links.insert', url, (err, res) => {
        if (err) {
          console.log(err.reason);
          this.setState({errors: err.reason});
        } else {
          this.setState({errors: ''});
        }
      })
      this.refs.url.value = '';
    }
  }
  onLogout () {
    Accounts.logout();
  }
  render () {
    return(
      <div>
        <h1>Your Links</h1>
        <button onClick={this.onLogout.bind(this)}>Logout</button>
        <LinksList />

        <p>Add a Link</p>
        { this.state.errors ? <p>{this.state.errors}</p> : null}
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type='text' ref='url' name='url' placeholder="Link URL" />
          <button>Create Link</button>
        </form>
      </div>
    )
  }
}
