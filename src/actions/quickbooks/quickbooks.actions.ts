import { types } from './quickbooks.types';
import {setQBAuthStateToLocalStorage} from "../../utils/local-storage.service";

export const setQuickbooksConnection = (connectionState: boolean) => {
  setQBAuthStateToLocalStorage(connectionState);
  return {
    'payload': connectionState,
    'type': types.SET_QB_CONNECTION
  };
};

