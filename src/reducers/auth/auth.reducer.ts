import { Reducer } from 'redux';
import { AuthAction, AuthActionType, AuthState } from './auth.types';

const initialState: AuthState = {
  isFetching: false,
  user: null,
};

const authReducer: Reducer<AuthState, AuthAction> = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionType.LOGIN_PENDING: {
      return { ...state, isFetching: true };
    }
    //
    case AuthActionType.LOGIN_FAILURE: {
      return { ...state, isFetching: false };
    }
    //
    case AuthActionType.LOGIN_SUCCESS: {
      return { ...state, isFetching: false, user: action.payload };
    }
    //
    default:
      return state;
  }
};

export default authReducer;
