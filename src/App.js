import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import Layout from './hoc/Layout/Layout';
import PrivateRoute from './hoc/PrivateRoute';
import asyncComponent from './hoc/asyncComponent';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';

const asyncCheckout = asyncComponent(() =>
  import('./containers/Checkout/Checkout')
);
const asyncOrders = asyncComponent(() => import('./containers/Orders/Orders'));
const asyncAuth = asyncComponent(() => import('./containers/Auth/Auth'));

const mapDispatchToProps = dispatch => ({
  onTryAutoSignup: () => dispatch(actions.authCheckState())
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <PrivateRoute path="/checkout" component={asyncCheckout} />
            <PrivateRoute path="/orders" component={asyncOrders} />
            <PrivateRoute path="/logout" component={Logout} />
            <Route path="/auth" component={asyncAuth} />
            <Route path="/" component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
