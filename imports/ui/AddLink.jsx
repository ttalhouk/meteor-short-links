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
        <button
          onClick={() => this.setState({isOpen: true})}
          className="button"
        >
          + Add a Link
        </button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add Link"
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={this.handleModalClose.bind(this)}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal"
        >
          <h1>Add a Link</h1>
          { this.state.errors ? <p>{this.state.errors}</p> : null}
          <form
            onSubmit={this.onSubmit.bind(this)}
            className="boxed-view__form">
            <input type='text'
              ref='url'
              name='url'
              placeholder="Link URL"
              value={this.state.url}
              onChange= {this.handleInput.bind(this)}/>
            <button className="button">Create Link</button>
            <button
              type="button"
              className="button button--secondary"
              onClick={this.handleModalClose.bind(this)}>
              Cancel
            </button>
          </form>
        </Modal>
      </div>
    )

  }
}

export default AddLink;
