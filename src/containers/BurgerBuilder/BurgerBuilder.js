import React, { Component } from 'react';
import axios from '../../axios-orders';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios
      .get('https://burger-builder-580a8.firebaseio.com/ingredients.json')
      .then(response => this.setState({ ingredients: response.data }))
      .catch(error => this.setState({ error }));
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.setState({ loading: true });

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice, //необходима проверка на бекенде в продакшене
      customer: {
        name: 'Ruslan',
        address: {
          street: 'Deryabinoi',
          zipCode: '620102',
          country: 'Russia'
        },
        email: 'ruslan@gmail.com'
      },
      deliveryMethod: 'fastest'
    };
    axios
      .post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false, purchasing: false });
        console.log(response);
      })
      .catch(err => {
        this.setState({ loading: false, purchasing: false });
        console.log(err);
      });
  };

  updatePurchaseState = () => {
    const sum = Object.values(this.state.ingredients).reduce(
      (sum, amount) => sum + amount,
      0
    );
    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = type => {
    this.setState(
      prevState => ({
        ingredients: {
          ...prevState.ingredients,
          [type]: prevState.ingredients[type] + 1
        },
        totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type]
      }),
      this.updatePurchaseState
    );
  };

  removeIngredientHandler = type => {
    this.setState(
      prevState => ({
        ingredients: {
          ...prevState.ingredients,
          [type]:
            prevState.ingredients[type] > 0
              ? prevState.ingredients[type] - 1
              : 0
        },
        totalPrice: prevState.totalPrice - INGREDIENT_PRICES[type]
      }),
      this.updatePurchaseState
    );
  };

  render() {
    const disabledControlTypes = {
      ...this.state.ingredients
    };
    for (let type in disabledControlTypes) {
      disabledControlTypes[type] = disabledControlTypes[type] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients can't be loaded.</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          cancelPurchase={this.purchaseCancelHandler}
          continuePurchase={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      );

      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            addIngredient={this.addIngredientHandler}
            removeIngredient={this.removeIngredientHandler}
            disabled={disabledControlTypes}
            price={this.state.totalPrice}
            makeOrder={this.purchaseHandler}
            purchasable={this.state.purchasable}
          />
        </Aux>
      );
    }

    if (this.state.loading) orderSummary = <Spinner />;

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          closeModal={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
