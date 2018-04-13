import reducer from './auth.js';
import * as actionTypes from '../actions/actionsTypes';

describe('auth reducer', () => {
  const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should store the token upon login', () => {
    expect(
      reducer(initialState, {
        type: actionTypes.AUTH_SUCCESS,
        token: 'token',
        userId: 'user-id'
      })
    ).toEqual({ ...initialState, token: 'token', userId: 'user-id' });
  });
});
