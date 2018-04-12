import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = ({ onClickDrawerToggle, isAuth }) => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle onClick={onClickDrawerToggle} />
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuth={isAuth} />
      </nav>
    </header>
  );
};

export default Toolbar;
