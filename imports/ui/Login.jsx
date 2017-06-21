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
      if (err) {
        this.setState({error: 'Unable to login. Check email and password.'});
      } else {
        this.setState({error: ''});
      }
    })

  }
  render () {
    return(
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Login to Short Links</h1>

          { this.state.error ? <p>{this.state.error}</p> : undefined }

          <form
            onSubmit={this.submitForm.bind(this)}
            className="boxed-view__form"
            noValidate>
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="Password" />
            <button className="button">Login</button>
          </form>
          <Link to="/signup">Need an Account?</Link>
        </div>
      </div>
    )
  }
}
