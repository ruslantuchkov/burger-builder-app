import React from 'react';
import classes from './Order.css';

const Order = props => {
  const ingredients = [];
  for (let ingName in props.ingredients) {
    ingredients.push({
      name: ingName,
      amount: props.ingredients[ingName]
    });
  }

  const ingredientOutput = ingredients.map(ing => (
    <span key={ing.name} className={classes.Ingredient}>
      {ing.name} ({ing.amount})
    </span>
  ));
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>{props.price.toFixed(2)}USD</strong>
      </p>
    </div>
  );
};

export default Order;
