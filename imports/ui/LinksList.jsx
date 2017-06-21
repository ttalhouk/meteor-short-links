import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import { Links } from '../api/links';

import LinksListItem from './LinksListItem';

class LinksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: []
    };
  }
  componentDidMount() {
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('links');
      const links = Links.find({visible: Session.get('showVisible')}).fetch();
      this.setState({ links });
    })
  }

  componentWillUnmount() {
    this.linksTracker.stop();
  }

  renderLinksListItems () {
    if (this.state.links.length > 0) {
      return this.state.links.map((link) => {
        const shortUrl = Meteor.absoluteUrl(link._id);
        return (
          <LinksListItem key={link._id} {...link} shortUrl={shortUrl}/>
        )
      })
    } else {
      return (
        <div className="item">
          <p className="item__message item__status-message">No Links found.</p>
        </div>
      )
    }
  }

  render () {
    return(
      <div>
        <div>
          <FlipMove maintainContainerHeight={true} easing="ease-out"  enterAnimation="elevator" leaveAnimation="elevator">
            {this.renderLinksListItems()}
          </FlipMove>
        </div>
      </div>
    )
  }
}

export default LinksList;
