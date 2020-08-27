import { Action } from 'redux';
import { COUNT_STATE, types } from '../actions/count/count.types';

const initialState = {
  'count': {
    'value': 0
  }
};

export default (state: COUNT_STATE = initialState.count, action: Action) => {
  switch (action.type) {
    case types.INCREASE_COUNT:
      return {
        ...state
      };
    case types.DECREASE_COUNT:
      return {
        ...state
      };
    default:
      return state;
  }
};
