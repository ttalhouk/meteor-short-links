import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
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
      const links = Links.find({}).fetch();
      this.setState({ links });
    })
  }

  componentWillUnmount() {
    this.linksTracker.stop();
  }

  renderLinksListItems () {
    return this.state.links.map((link) => {
      const shortUrl = Meteor.absoluteUrl(link._id);
      return (
        <LinksListItem key={link._id} {...link} shortUrl={shortUrl}/>
      )
    })
  }

  render () {
    return(
      <div>
        <div>
          {this.renderLinksListItems()}
        </div>
      </div>
    )
  }
}

export default LinksList;
