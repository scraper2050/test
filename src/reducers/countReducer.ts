import * as types from '../actions/actionTypes';
import initialState from './initialState';
import { Action } from 'redux';

export default (state: types.COUNT_STATE = initialState.count, action: Action) => {
  switch (action.type) {
    case types.INCREASE_COUNT:
      return {
        ...state,
      };
    case types.DECREASE_COUNT:
      return {
        ...state,
      };
    default:
      return state;
  }
};
