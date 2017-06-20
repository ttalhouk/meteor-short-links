import React from 'react';
import PropTypes from 'prop-types';
import {Accounts} from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor';



class AddLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      url: ''
    }
  }
  onSubmit (e) {
    e.preventDefault();

    const url = this.state.url;
    if (url) {
      Meteor.call('links.insert', url, (err, res) => {
        if (err) {
          console.log(err.reason);
        } else {
          this.setState({errors: '', url:''});
        }
      })
    }
  }
  handleInput(e) {
    let url = e.target.value;
    this.setState({url})
  }
  render () {
    return (
      <div>
        <p>Add a Link</p>
        { this.state.errors ? <p>{this.state.errors}</p> : null}
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type='text'
            ref='url'
            name='url'
            placeholder="Link URL"
            value={this.state.url}
            onChange= {this.handleInput.bind(this)}/>
          <button>Create Link</button>
        </form>
      </div>
    )

  }
}

export default AddLink;
