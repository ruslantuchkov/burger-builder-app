import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const OrderSummary = ({
  ingredients,
  cancelPurchase,
  continuePurchase,
  price
}) => {
  const ingredientSummary = Object.keys(ingredients).map(ing => (
    <li key={ing}>
      <span style={{ textTransform: 'capitalize' }}>{ing}</span>:{' '}
      {ingredients[ing]}
    </li>
  ));

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: {price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" onClick={cancelPurchase}>
        CANCEL
      </Button>
      <Button btnType="Success" onClick={continuePurchase}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default OrderSummary;
