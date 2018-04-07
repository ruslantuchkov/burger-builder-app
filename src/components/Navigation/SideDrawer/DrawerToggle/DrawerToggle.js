import React from 'react';
import classes from './DrawerToggle.css';

const DrawerToggle = ({ onClick }) => {
  return (
    <div className={classes.DrawerToggle} onClick={onClick}>
      <div />
      <div />
      <div />
    </div>
  );
};

export default DrawerToggle;
