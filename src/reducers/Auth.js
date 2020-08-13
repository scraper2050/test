import {
  SIGNOUT_USER_SUCCESS,
  USER_DATA,
  USER_TOKEN_SET
} from "../constants/actionTypes";

const INIT_STATE = {
  token: JSON.parse(localStorage.getItem('token')),
  authUser: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SIGNOUT_USER_SUCCESS: {
      return {
        ...state,
        token: null,
        authUser: null
      }
    }
    case USER_DATA: {
      return {
        ...state,
        authUser: action.payload,
      };
    }
    case USER_TOKEN_SET: {
      return {
        ...state,
        token: action.payload,
      };
    }
    default:
      return state;
  }
}