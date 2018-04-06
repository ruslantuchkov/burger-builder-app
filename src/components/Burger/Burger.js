import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = ({ ingredients }) => {
  let arrOfIngredients = Object.keys(ingredients)
    .map(ing =>
      [...Array(ingredients[ing])].map((_, i) => (
        <BurgerIngredient key={ing + i} type={ing} />
      ))
    )
    .reduce((arr, elem) => [...arr, ...elem], []);

  if (arrOfIngredients.length === 0) {
    arrOfIngredients = <p>Please start adding ingredients.</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {arrOfIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
