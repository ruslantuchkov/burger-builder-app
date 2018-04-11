import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';

export const addIngredient = ingredientName => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientName
});

export const removeIngredient = ingredientName => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredientName
});

export const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED
});

export const setIngredients = ingredients => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients
});

export const initIngredients = () => dispatch => {
  axios
    .get('https://burger-builder-580a8.firebaseio.com/ingredients.json')
    .then(response => dispatch(setIngredients(response.data)))
    .catch(error => dispatch(fetchIngredientsFailed()));
};
