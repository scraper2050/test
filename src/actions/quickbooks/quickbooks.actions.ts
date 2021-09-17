import { types } from './quickbooks.types';
import {setQBAuthStateToLocalStorage} from "../../utils/local-storage.service";
import {QuickbooksState} from "../../reducers/quickbooks.reducer";

export const setQuickbooksConnection = (connectionState: QuickbooksState) => {
  setQBAuthStateToLocalStorage(connectionState);
  return {
    'payload': connectionState,
    'type': types.SET_QB_CONNECTION
  };
};

