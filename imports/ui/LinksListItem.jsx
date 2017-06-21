import React from 'react'
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';


class LinksListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    }
  }
  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy);

    this.clipboard.on('success', () => {
      this.setState({copied: true});
      setTimeout(() => {
        this.setState({copied: false})
      }, 1000);
    }).on('error', () => {
      alert('Could not copy link. Please copy manually.');
    })
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  renderAnalytics() {
    const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
    if (typeof this.props.lastVisitedAt === 'number') {
      let last = moment(this.props.lastVisitedAt).fromNow();
      return (
        <p>{this.props.visitedCount} {visitMessage} (last visited: {last})</p>
      );
    } else {
      return (<p>{this.props.visitedCount} {visitMessage}</p>);
    }

  }

  render () {
    return(
      <div>
        <p>{this.props.url}</p>
        <p>{this.props.shortUrl}</p>
        {this.renderAnalytics()}
        <a
          href={this.props.shortUrl}
          target="_blank"
          className="button button--pill button--link"
          >
          Visit
        </a>
        <button
          ref="copy"
          className="button button--pill"
          data-clipboard-text={this.props.shortUrl} >
          {this.state.copied ? "Copied" : "Copy"}
        </button>
        <button
          onClick={() => {
            Meteor.call('links.setVisibility', this.props._id, !this.props.visible)
        }}
          className="button button--pill"
        >
          {this.props.visible ? 'Hide' : 'Show'}
        </button>
      </div>
    )
  }
}

LinksListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  visitedCount: PropTypes.number.isRequired,
  lastVisitedAt: PropTypes.number

}

export default LinksListItem;
