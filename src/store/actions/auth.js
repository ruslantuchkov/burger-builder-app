import * as actionTypes from './actionsTypes';
import axios from 'axios';

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const authSuccess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  token,
  userId
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error
});

export const auth = (email, password, isSignup) => dispatch => {
  dispatch(authStart());

  const authData = {
    email,
    password,
    returnSecureToken: true
  };
  let url =
    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB9xtbZXciI8mDuJ7lThi61V5BAnK2sCsE';
  if (!isSignup) {
    url =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB9xtbZXciI8mDuJ7lThi61V5BAnK2sCsE';
  }
  axios
    .post(url, authData)
    .then(response => {
      dispatch(authSuccess(response.data.idToken, response.data.localId));
    })
    .catch(err => {
      dispatch(authFail(err.response.data.error));
    });
};
