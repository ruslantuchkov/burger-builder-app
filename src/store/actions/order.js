import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  orderId: id,
  orderData
});

export const purchaseBurgerFail = error => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  error
});

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START
});

export const purchaseBurger = orderData => dispatch => {
  dispatch(purchaseBurgerStart());

  axios
    .post('/orders.json', orderData)
    .then(response => {
      dispatch(purchaseBurgerSuccess(response.data.name, orderData));
    })
    .catch(err => {
      dispatch(purchaseBurgerFail(err));
    });
};

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT
});

export const fetchOrdersSuccess = orders => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders
});

export const fetchOrdersFail = error => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  error
});

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START
});

export const fetchOrders = () => dispatch => {
  dispatch(fetchOrdersStart());
  axios
    .get('/orders.json')
    .then(response => {
      const fetchedOrders = Object.values(response.data).map((order, i) => ({
        ...order,
        id: Object.keys(response.data)[i]
      }));
      dispatch(fetchOrdersSuccess(fetchedOrders));
    })
    .catch(err => dispatch(fetchOrdersFail(err)));
};
