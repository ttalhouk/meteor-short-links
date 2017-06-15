import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import { Meteor } from 'meteor/meteor'

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }
  submitForm(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    Meteor.loginWithPassword({email}, password, (err) => {
      console.log('login', err);
    })

  }
  render () {
    return(
      <div>
        <h1>Login to Short Links</h1>

          { this.state.error ? <p>{this.state.error}</p> : undefined }

          <form onSubmit={this.submitForm.bind(this)}>
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="Password" />
            <button>Login</button>
          </form>
        <Link to="/signup">Have an Account?</Link>
      </div>
    )
  }
}
