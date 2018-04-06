import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4
  };

  addIngredientHandler = type =>
    this.setState(prevState => ({
      ingredients: {
        ...prevState.ingredients,
        [type]: prevState.ingredients[type] + 1
      },
      totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type]
    }));

  removeIngredientHandler = type =>
    this.setState(prevState => ({
      ingredients: {
        ...prevState.ingredients,
        [type]:
          prevState.ingredients[type] > 0 ? prevState.ingredients[type] - 1 : 0
      },
      totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type]
    }));

  render() {
    const disabledControlTypes = {
      ...this.state.ingredients
    };
    for (let type in disabledControlTypes) {
      disabledControlTypes[type] = disabledControlTypes[type] <= 0;
    }

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabled={disabledControlTypes}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
