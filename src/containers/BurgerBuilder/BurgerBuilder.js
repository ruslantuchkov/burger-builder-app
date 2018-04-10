import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import axios from '../../axios-orders';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const mapStateToProps = state => ({
  ings: state.ingredients,
  totalPrice: state.totalPrice
});

const mapDispatchToProps = dispatch => ({
  onAddIngredient: ingredientName =>
    dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName }),
  onRemoveIngredient: ingredientName =>
    dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName })
});

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    // axios
    //   .get('https://burger-builder-580a8.firebaseio.com/ingredients.json')
    //   .then(response => this.setState({ ingredients: response.data }))
    //   .catch(error => this.setState({ error }));
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  updatePurchaseState = () => {
    const sum = Object.values(this.props.ings).reduce(
      (sum, amount) => sum + amount,
      0
    );
    return sum > 0;
  };

  render() {
    const disabledControlTypes = {
      ...this.props.ings
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

    if (this.props.ings) {
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          cancelPurchase={this.purchaseCancelHandler}
          continuePurchase={this.purchaseContinueHandler}
          price={this.props.totalPrice}
        />
      );

      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            addIngredient={this.props.onAddIngredient}
            removeIngredient={this.props.onRemoveIngredient}
            disabled={disabledControlTypes}
            price={this.props.totalPrice}
            makeOrder={this.purchaseHandler}
            purchasable={this.updatePurchaseState()}
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

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(BurgerBuilder, axios)
);
