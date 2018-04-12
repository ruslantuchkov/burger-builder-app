import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

function mapDispatchToProps(dispatch) {
  return {
    onLogout: () => dispatch(actions.logout())
  };
}

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
  }
  render() {
    return <Redirect to="/" />;
  }
}

export default connect(null, mapDispatchToProps)(Logout);
