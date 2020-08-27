import { Dispatch } from 'redux';
import { types } from './count.types';
export const increaseCountAction = () => (dispatch: Dispatch) => {
  dispatch({
    'type': types.INCREASE_COUNT
  });
};

export const decreaseCountAction = () => (dispatch: Dispatch) => {
  dispatch({
    'type': types.DECREASE_COUNT
  });
};
