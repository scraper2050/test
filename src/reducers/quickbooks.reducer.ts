import { types } from '../actions/quickbooks/quickbooks.types';
import {Reducer} from "redux";
import {getQBAuthStateFromLocalStorage, setQBAuthStateToLocalStorage} from "../utils/local-storage.service";

export interface QuickbooksState {
  qbAuthorized: boolean;
  qbCompanyEmail?: string;
  qbCompanyName?: string;
}

const initialQBState = {
  'connectionState': getQBAuthStateFromLocalStorage(),
};

export const quickbooksReducer: Reducer<any> = (
  state = initialQBState,
  action
) => {
  switch (action.type) {
    case types.SET_QB_CONNECTION:
      return {
        ...state,
        'connectionState': action.payload
      };
    default:
      return state;
  }
};

