import React from 'react';
import PropTypes from 'prop-types';
import {Accounts} from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor';

import { Links } from '../api/links';

import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';

export default () => {
  return(
    <div>
      <PrivateHeader title="Your Links" />
      <LinksListFilters />
      <LinksList />
      <AddLink />
    </div>
  )
}
