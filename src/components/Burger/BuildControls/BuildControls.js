import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const BuildControls = ({ addIngredient, removeIngredient, disabled }) => {
  return (
    <div className={classes.BuildControls}>
      {controls.map(({ label, type }) => (
        <BuildControl
          key={label}
          label={label}
          add={() => addIngredient(type)}
          remove={() => removeIngredient(type)}
          disabled={disabled[type]}
        />
      ))}
    </div>
  );
};

export default BuildControls;
