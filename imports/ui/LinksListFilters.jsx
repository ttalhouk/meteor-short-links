import React from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';


class LinksListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      showVisible: true
    }
  }
  componentDidMount() {
    this.checkTracker = Tracker.autorun(() => {
      this.setState({showVisible: Session.get('showVisible')})
    })
  }

  componentWillUnmount() {
    this.checkTracker.stop();
  }
  render () {
    return (
      <div>
        <label className="checkbox">
          <input
            type='checkbox'
            className="checkbox__box"
            checked={!this.state.showVisible}
            onChange={(e) => {
              Session.set('showVisible', !e.target.checked);
            }
          }/>
          Show Hidden Links
        </label>
      </div>
    )
  }
}

export default LinksListFilters;
