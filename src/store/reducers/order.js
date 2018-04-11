import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
  orders: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      };
    case actionsTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId
      };
      return {
        ...state,
        loading: false,
        orderds: [...state.orders, newOrder]
      };
    case actionsTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
