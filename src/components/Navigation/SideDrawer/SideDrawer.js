import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const SideDrawer = ({ onClose, isOpen, isAuth }) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (isOpen) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop show={isOpen} onClick={onClose} />
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuth={isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
