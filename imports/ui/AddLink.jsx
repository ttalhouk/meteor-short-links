import React from 'react';
import PropTypes from 'prop-types';
import {Accounts} from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor';
import Modal from 'react-modal';




class AddLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      url: '',
      isOpen: false
    }
  }
  onSubmit (e) {
    e.preventDefault();

    const url = this.state.url;

    Meteor.call('links.insert', url, (err, res) => {
      if (err) {
        this.setState({error: err.reason});
      } else {
        this.handleModalClose();
      }
    });

  }
  handleInput(e) {
    let url = e.target.value;
    this.setState({url})
  }
  handleModalClose() {
    this.setState({
      url: '',
      isOpen: false,
      error: ''
    });
  }
  render () {
    return (
      <div>
        <button onClick={() => this.setState({isOpen: true})}>+ Add a Link</button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add Link"
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={this.handleModalClose.bind(this)}
        >
          <h1>Add a Link</h1>
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
          <button onClick={this.handleModalClose.bind(this)}>
            Cancel
          </button>
        </Modal>
      </div>
    )

  }
}

export default AddLink;
