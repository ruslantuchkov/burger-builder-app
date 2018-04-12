import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  isAuth: state.auth.token !== null
});

const PrivateRoute = props => (props.isAuth ? <Route {...props} /> : null);

export default connect(mapStateToProps)(PrivateRoute);
