import * as types from "./actionTypes";
import { Dispatch } from 'redux';
export const increaseCountAction = () => (dispatch: Dispatch) => {
  dispatch({
    type: types.INCREASE_COUNT,
  });
};

export const decreaseCountAction = () => (dispatch: Dispatch) => {
  dispatch({
    type: types.DECREASE_COUNT,
  });
};
