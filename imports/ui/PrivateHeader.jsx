import React from 'react';
import PropTypes from 'prop-types';
import {Accounts} from 'meteor/accounts-base';

// class PrivateHeader extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   onLogout () {
//     Accounts.logout();
//   }
//   render () {
//     return (
//       <div>
//         <h1>{this.props.title}</h1>
//         <button onClick={this.onLogout.bind(this)}>Logout</button>
//       </div>
//     )
//   }
// }

const PrivateHeader = (props) => {
  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header header__brand">{props.title}</h1>
        <button className="button button--link-text"
          onClick={ () =>  Accounts.logout() }>
          Logout
        </button>
      </div>
    </div>
  )
}

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
}


export default PrivateHeader;
