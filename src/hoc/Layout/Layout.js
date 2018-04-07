import React, { Component } from 'react';
import classes from './Layout.css';
import Aux from '../Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  render() {
    return (
      <Aux>
        <Toolbar />
        <SideDrawer />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
