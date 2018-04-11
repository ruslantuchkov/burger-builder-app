import * as actionTypes from '../actions/actionsTypes';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
};

const authStart = (state, action) => ({
  ...state,
  error: null,
  loading: true
});

const authSuccess = (state, action) => ({
  ...state,
  error: null,
  loading: false,
  token: action.token,
  userId: action.userId
});

const authFail = (state, action) => ({
  ...state,
  error: action.error,
  loading: false
});

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    default:
      return state;
  }
};
