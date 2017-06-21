import React from 'react';
import {Meteor} from 'meteor/meteor';


import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';

export default () => {
  return(
    <div>
      <PrivateHeader title="Short Links" />
      <div className="wrapper">        
        <LinksListFilters />
        <AddLink />
        <LinksList />
      </div>
    </div>
  )
}
